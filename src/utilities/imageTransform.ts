import { imageFrom } from "@uniformdev/assets";
import type { AssetParamValue } from "@uniformdev/assets";

interface TransformOptions {
  width: number;
  height?: number;
  fit?: "cover" | "contain" | "scale-down";
  focal?: { x: number; y: number } | "center" | "auto";
  quality?: number;
  dpr?: number;
}

/**
 * Transform an image URL with focal point support
 * 
 * Handles Unsplash images (using Imgix parameters), Cloudinary images,
 * and Uniform images (using Uniform's transform API).
 * 
 * @param asset - Uniform asset parameter value
 * @param options - Transform options (width, height, fit, focal point, etc.)
 * @returns Transformed image URL or undefined
 */
export function getTransformedImageUrl(
  asset: AssetParamValue[number] | undefined,
  options: TransformOptions
): string | undefined {
  if (!asset) return undefined;

  const baseUrl = asset.fields?.url?.value;
  if (!baseUrl) return undefined;

  // Check if this is an Unsplash image
  if (baseUrl.includes('images.unsplash.com')) {
    const transformedUrl = buildUnsplashUrl(baseUrl, options);
    console.log('[Image Transform] Unsplash image:', {
      source: baseUrl,
      transformed: transformedUrl,
      options,
    });
    return transformedUrl;
  }

  // Check if this is a Cloudinary image
  if (baseUrl.includes('res.cloudinary.com')) {
    // Extract original dimensions from the asset for accurate focal point calculation
    const originalWidth = asset.fields?.width?.value;
    const originalHeight = asset.fields?.height?.value;
    const transformedUrl = buildCloudinaryUrl(baseUrl, options, originalWidth, originalHeight);
    console.log('[Image Transform] Cloudinary image:', {
      source: baseUrl,
      transformed: transformedUrl,
      options,
      originalDimensions: { width: originalWidth, height: originalHeight },
    });
    return transformedUrl;
  }

  // For Uniform images, use the imageFrom API
  const transformedUrl = buildUniformUrl(asset, options);
  console.log('[Image Transform] Uniform image:', {
    source: baseUrl,
    transformed: transformedUrl,
    options,
  });
  return transformedUrl;
}

/**
 * Build Unsplash URL with Imgix transformation parameters
 */
function buildUnsplashUrl(
  rawUrl: string,
  options: TransformOptions
): string {
  console.log('[buildUnsplashUrl] Input:', { rawUrl, options });
  const url = new URL(rawUrl);
  
  // Set dimensions
  url.searchParams.set("w", String(options.width));
  if (options.height) {
    url.searchParams.set("h", String(options.height));
  }
  
  // Determine fit mode
  const fit = options.fit || "cover";
  
  // For Imgix (Unsplash), when we have both dimensions and want cover behavior,
  // we must use fit=crop to enforce cropping
  if (options.height && fit === "cover") {
    url.searchParams.set("fit", "crop");
    
    // Handle focal point for crop mode
    if (options.focal) {
      if (typeof options.focal === "object") {
        // Custom focal point coordinates (0-1)
        url.searchParams.set("crop", "focalpoint");
        url.searchParams.set("fp-x", String(options.focal.x));
        url.searchParams.set("fp-y", String(options.focal.y));
      } else if (options.focal === "center") {
        // Center focal point
        url.searchParams.set("crop", "focalpoint");
        url.searchParams.set("fp-x", "0.5");
        url.searchParams.set("fp-y", "0.5");
      } else if (options.focal === "auto") {
        // Auto focal point (faces or entropy)
        url.searchParams.set("crop", "faces,entropy");
      }
    } else {
      // Default crop strategy when no focal point specified
      url.searchParams.set("crop", "entropy");
    }
  } else {
    // For other fit modes or when only width is specified
    url.searchParams.set("fit", fit === "scale-down" ? "max" : fit);
  }
  
  // Set quality
  if (options.quality) {
    url.searchParams.set("q", String(options.quality));
  }
  
  // Set device pixel ratio
  if (options.dpr) {
    url.searchParams.set("dpr", String(options.dpr));
  }
  
  // Auto format for optimal delivery
  url.searchParams.set("auto", "format");
  
  return url.toString();
}

/**
 * Build Cloudinary URL with transformation parameters
 * 
 * Cloudinary URLs follow the pattern:
 * https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}.{format}
 */
function buildCloudinaryUrl(
  rawUrl: string,
  options: TransformOptions,
  originalWidth?: number,
  originalHeight?: number
): string {
  console.log('[buildCloudinaryUrl] Input:', { rawUrl, options, originalWidth, originalHeight });
  
  // Parse the Cloudinary URL
  // Example: https://res.cloudinary.com/demo/image/upload/v1234567/sample.jpg
  const urlPattern = /^(https?:\/\/res\.cloudinary\.com\/[^\/]+\/[^\/]+\/[^\/]+)\/(.+)$/;
  const match = rawUrl.match(urlPattern);
  
  if (!match) {
    console.warn('[buildCloudinaryUrl] Invalid Cloudinary URL format');
    return rawUrl;
  }
  
  const [, baseUrlPath, assetPath] = match;
  
  // Build transformation parameters
  const transformations: string[] = [];
  
  // Determine crop/resize mode
  const fit = options.fit || "cover";
  if (options.height) {
    // When both dimensions are specified
    if (fit === "cover") {
      transformations.push("c_fill");
    } else if (fit === "contain") {
      transformations.push("c_fit");
    } else if (fit === "scale-down") {
      transformations.push("c_limit");
    }
  } else {
    // Only width specified
    if (fit === "scale-down") {
      transformations.push("c_limit");
    } else {
      transformations.push("c_scale");
    }
  }
  
  // Add dimensions
  transformations.push(`w_${options.width}`);
  if (options.height) {
    transformations.push(`h_${options.height}`);
  }
  
  // Handle gravity/focal point
  if (options.focal) {
    if (typeof options.focal === "object") {
      // Custom focal point coordinates (0-1)
      // Only use g_xy_center if we have original dimensions for pixel-based positioning
      if (originalWidth && originalHeight) {
        transformations.push("g_xy_center");
        const x = Math.round(originalWidth * options.focal.x);
        const y = Math.round(originalHeight * options.focal.y);
        transformations.push(`x_${x}`);
        transformations.push(`y_${y}`);
      } else {
        // Without original dimensions, fall back to auto gravity
        // g_xy_center requires pixel coordinates, not percentages
        console.warn('[buildCloudinaryUrl] No original dimensions available for focal point, falling back to g_auto');
        transformations.push("g_auto");
      }
    } else if (options.focal === "center") {
      transformations.push("g_center");
    } else if (options.focal === "auto") {
      transformations.push("g_auto");
    }
  } else if (fit === "cover" && options.height) {
    // Default to auto gravity for fill mode
    transformations.push("g_auto");
  }
  
  // Set quality
  if (options.quality) {
    transformations.push(`q_${options.quality}`);
  }
  
  // Set device pixel ratio
  if (options.dpr) {
    transformations.push(`dpr_${options.dpr}`);
  }
  
  // Auto format for optimal delivery
  transformations.push("f_auto");
  
  // Construct the final URL
  const transformationString = transformations.join(',');
  const finalUrl = `${baseUrlPath}/${transformationString}/${assetPath}`;
  
  console.log('[buildCloudinaryUrl] Output:', { transformationString, finalUrl });
  return finalUrl;
}

/**
 * Build Uniform URL using imageFrom API
 */
function buildUniformUrl(
  asset: AssetParamValue[number],
  options: TransformOptions
): string | undefined {
  console.log('[buildUniformUrl] Input:', { assetUrl: asset.fields?.url?.value, options });
  const focalPoint = options.focal;
  
  // Build transform parameters based on whether we have a focal point
  if (options.fit === "cover" && options.height && focalPoint && typeof focalPoint === "object") {
    return imageFrom(asset)
      .transform({
        width: options.width,
        height: options.height,
        fit: "cover" as const,
        focal: focalPoint,
      })
      .url();
  } else if (options.fit === "cover" && options.height && focalPoint === "center") {
    return imageFrom(asset)
      .transform({
        width: options.width,
        height: options.height,
        fit: "cover" as const,
        focal: "center" as const,
      })
      .url();
  } else if (options.height) {
    // With height specified
    const fitMode = options.fit || "cover";
    return imageFrom(asset)
      .transform({
        width: options.width,
        height: options.height,
        fit: fitMode as "cover" | "contain" | "scale-down",
      })
      .url();
  } else {
    // Width only (scale-down mode)
    const fitMode = options.fit || "scale-down";
    return imageFrom(asset)
      .transform({
        width: options.width,
        fit: fitMode as "cover" | "contain" | "scale-down",
      })
      .url();
  }
}

