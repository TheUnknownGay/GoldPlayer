import { useEffect, useState, useRef, useCallback } from 'react';

export interface GamepadButtonEvents {
  onCross?: () => void;
  onCircle?: () => void;
  onSquare?: () => void;
  onTriangle?: () => void;
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  onL1?: () => void;
  onR1?: () => void;
  onOptions?: () => void;
}

export function useGamepad(callbacks: GamepadButtonEvents) {
  const [hasGamepad, setHasGamepad] = useState<boolean>(false);
  const [gamepadName, setGamepadName] = useState<string>('');
  const lastButtonStates = useRef<Record<number, boolean>>({});
  const lastAxisTime = useRef<number>(0);

  const callbacksRef = useRef(callbacks);
  callbacksRef.current = callbacks;

  useEffect(() => {
    const handleConnected = (e: GamepadEvent) => {
      setHasGamepad(true);
      setGamepadName(e.gamepad.id || 'Manette PlayStation');
    };

    const handleDisconnected = () => {
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
      const anyActive = Array.from(gamepads).some(gp => gp !== null);
      setHasGamepad(anyActive);
      if (!anyActive) setGamepadName('');
    };

    window.addEventListener('gamepadconnected', handleConnected);
    window.addEventListener('gamepaddisconnected', handleDisconnected);

    // Initial check
    if (navigator.getGamepads) {
      const gamepads = navigator.getGamepads();
      for (const gp of gamepads) {
        if (gp) {
          setHasGamepad(true);
          setGamepadName(gp.id || 'Manette PlayStation');
          break;
        }
      }
    }

    // Gamepad polling loop
    let animId: number;
    const pollGamepads = () => {
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
      const gp = gamepads[0];

      if (gp) {
        const cbs = callbacksRef.current;
        const now = Date.now();

        // Check buttons
        gp.buttons.forEach((btn, idx) => {
          const isPressed = btn.pressed || btn.value > 0.5;
          const wasPressed = !!lastButtonStates.current[idx];

          if (isPressed && !wasPressed) {
            // Button pressed down edge
            if (idx === 0) cbs.onCross?.();
            if (idx === 1) cbs.onCircle?.();
            if (idx === 2) cbs.onSquare?.();
            if (idx === 3) cbs.onTriangle?.();
            if (idx === 4) cbs.onL1?.();
            if (idx === 5) cbs.onR1?.();
            if (idx === 9) cbs.onOptions?.();
            if (idx === 12) cbs.onUp?.();
            if (idx === 13) cbs.onDown?.();
            if (idx === 14) cbs.onLeft?.();
            if (idx === 15) cbs.onRight?.();
          }

          lastButtonStates.current[idx] = isPressed;
        });

        // Check Left Joystick Axes with repeat throttle (200ms)
        if (gp.axes && now - lastAxisTime.current > 200) {
          const axisX = gp.axes[0];
          const axisY = gp.axes[1];
          const threshold = 0.55;

          if (axisY < -threshold) {
            cbs.onUp?.();
            lastAxisTime.current = now;
          } else if (axisY > threshold) {
            cbs.onDown?.();
            lastAxisTime.current = now;
          } else if (axisX < -threshold) {
            cbs.onLeft?.();
            lastAxisTime.current = now;
          } else if (axisX > threshold) {
            cbs.onRight?.();
            lastAxisTime.current = now;
          }
        }
      }

      animId = requestAnimationFrame(pollGamepads);
    };

    animId = requestAnimationFrame(pollGamepads);

    // Keyboard fallback for TV / Browser navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const cbs = callbacksRef.current;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          cbs.onUp?.();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          cbs.onDown?.();
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          cbs.onLeft?.();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          cbs.onRight?.();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          cbs.onCross?.();
          break;
        case 'Escape':
        case 'Backspace':
          e.preventDefault();
          cbs.onCircle?.();
          break;
        case 'f':
        case 'F':
          cbs.onSquare?.();
          break;
        case 't':
        case 'T':
          cbs.onTriangle?.();
          break;
        case 'q':
        case 'Q':
        case 'PageUp':
          cbs.onL1?.();
          break;
        case 'e':
        case 'E':
        case 'PageDown':
          cbs.onR1?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('gamepadconnected', handleConnected);
      window.removeEventListener('gamepaddisconnected', handleDisconnected);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  return { hasGamepad, gamepadName };
}
