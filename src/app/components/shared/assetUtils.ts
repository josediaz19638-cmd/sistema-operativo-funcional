import { useEffect, useMemo, useState } from 'react';

const DEFAULT_EXTENSIONS = ['svg', 'png', 'jpg', 'jpeg', 'webp'];

function normalizeAssetPath(path: string) {
  return path.trim();
}

function stripExtension(path: string) {
  const lastSlash = path.lastIndexOf('/');
  const lastDot = path.lastIndexOf('.');
  if (lastDot <= lastSlash) return path;
  return path.slice(0, lastDot);
}

export function buildAssetCandidates(path: string, extensions: string[] = DEFAULT_EXTENSIONS) {
  const normalized = normalizeAssetPath(path);
  if (!normalized) return [];

  const hasExtension = /\.[a-z0-9]+$/i.test(normalized);
  const base = hasExtension ? stripExtension(normalized) : normalized;
  const candidates = new Set<string>();

  if (hasExtension) {
    candidates.add(normalized);
  } else {
    candidates.add(base);
  }

  for (const extension of extensions) {
    candidates.add(`${base}.${extension}`);
  }

  return Array.from(candidates);
}

export function useResolvedAssetSource(path: string, extensions: string[] = DEFAULT_EXTENSIONS) {
  const candidates = useMemo(() => buildAssetCandidates(path, extensions), [path, extensions]);
  const [resolvedSource, setResolvedSource] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    if (!candidates.length) {
      setResolvedSource('');
      return () => {
        cancelled = true;
      };
    }

    setResolvedSource('');

    const tryCandidate = (index: number) => {
      if (cancelled) return;
      if (index >= candidates.length) {
        setResolvedSource('');
        return;
      }

      const candidate = candidates[index];
      const image = new Image();
      image.onload = () => {
        if (!cancelled) setResolvedSource(candidate);
      };
      image.onerror = () => tryCandidate(index + 1);
      image.src = candidate;
    };

    tryCandidate(0);

    return () => {
      cancelled = true;
    };
  }, [candidates]);

  return resolvedSource;
}
