import { useState, useCallback, useEffect } from 'react';
import type { Annotation } from '../types';

const STORAGE_KEY = 'mypdfsigner-annotations';

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export function useAnnotations() {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [history, setHistory] = useState<Annotation[][]>([]);
  const [redoStack, setRedoStack] = useState<Annotation[][]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Annotation[];
        setAnnotations(parsed);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(annotations));
  }, [annotations]);

  const pushHistory = useCallback((next: Annotation[]) => {
    setHistory((prev) => [...prev, next]);
    setRedoStack([]);
  }, []);

  const addAnnotation = useCallback(
    (annotation: Omit<Annotation, 'id'>) => {
      const next = [...annotations, { ...annotation, id: generateId() }];
      setAnnotations(next);
      pushHistory(next);
    },
    [annotations, pushHistory],
  );

  const updateAnnotation = useCallback(
    (id: string, patch: Partial<Annotation> | ((a: Annotation) => Annotation)) => {
      const next = annotations.map((a) => {
        if (a.id !== id) return a;
        if (typeof patch === 'function') {
          return patch(a);
        }
        return { ...a, ...patch };
      });
      setAnnotations(next);
      pushHistory(next);
    },
    [annotations, pushHistory],
  );

  const deleteAnnotation = useCallback(
    (id: string) => {
      const next = annotations.filter((a) => a.id !== id);
      setAnnotations(next);
      pushHistory(next);
    },
    [annotations, pushHistory],
  );

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const earlier = history.slice(0, history.length - 1);
    setRedoStack((s) => [annotations, ...s]);
    setAnnotations(earlier.length > 0 ? earlier[earlier.length - 1] : []);
    setHistory(earlier);
  }, [history, annotations]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const [next, ...rest] = redoStack;
    setAnnotations(next);
    setHistory((h) => [...h, next]);
    setRedoStack(rest);
  }, [redoStack]);

  const clear = useCallback(() => {
    setAnnotations([]);
    pushHistory([]);
  }, [pushHistory]);

  return {
    annotations,
    addAnnotation,
    updateAnnotation,
    deleteAnnotation,
    undo,
    redo,
    canUndo: history.length > 0,
    canRedo: redoStack.length > 0,
    clear,
  };
}
