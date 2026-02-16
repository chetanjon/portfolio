'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, RotateCcw, Check, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

interface ColorSet {
  secondary: string;
  tertiary: string;
  card: string;
}

interface ColorPreset {
  name: string;
  light: ColorSet;
  dark: ColorSet;
}

// Presets with both light and dark mode variants
const colorPresets: ColorPreset[] = [
  {
    name: 'Sage Green',
    light: { secondary: '#C9D2C5', tertiary: '#D4DDD0', card: '#BFC9BB' },
    dark: { secondary: '#2A3328', tertiary: '#1F2620', card: '#232A22' },
  },
  {
    name: 'Warm Beige',
    light: { secondary: '#D4C4B0', tertiary: '#DED0BE', card: '#CEBFA9' },
    dark: { secondary: '#332A22', tertiary: '#28211A', card: '#2D251E' },
  },
  {
    name: 'Dusty Rose',
    light: { secondary: '#D4C4C9', tertiary: '#DED0D4', card: '#CEBABF' },
    dark: { secondary: '#332A2D', tertiary: '#282125', card: '#2D2427' },
  },
  {
    name: 'Soft Blue',
    light: { secondary: '#C4CDD4', tertiary: '#D0D9DE', card: '#BAC4CC' },
    dark: { secondary: '#222A33', tertiary: '#1A2128', card: '#1E252D' },
  },
  {
    name: 'Lavender',
    light: { secondary: '#CFC9D4', tertiary: '#D9D0DE', card: '#C5BFCC' },
    dark: { secondary: '#2A2833', tertiary: '#211F28', card: '#25232D' },
  },
  {
    name: 'Mint',
    light: { secondary: '#C5D4CF', tertiary: '#D0DED8', card: '#BBCEC6' },
    dark: { secondary: '#223330', tertiary: '#1A2825', card: '#1E2D2A' },
  },
  {
    name: 'Peach',
    light: { secondary: '#D4CFC5', tertiary: '#DED9D0', card: '#CEC5BB' },
    dark: { secondary: '#33302A', tertiary: '#282521', card: '#2D2A25' },
  },
  {
    name: 'Slate',
    light: { secondary: '#CBCDD0', tertiary: '#D6D8DB', card: '#C2C4C7' },
    dark: { secondary: '#282A2D', tertiary: '#1F2123', card: '#232527' },
  },
];

const DEFAULT_PRESET = colorPresets[2]; // Dusty Rose as default
const STORAGE_KEY = 'portfolio-accent-colors';

// Helper function to adjust color brightness
function adjustBrightness(hex: string, percent: number): string {
  if (!hex || !hex.startsWith('#') || hex.length !== 7) return hex;
  const num = parseInt(hex.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0xff) + amt));
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1).toUpperCase()}`;
}

// Convert a light color to a dark variant
function toDarkVariant(hex: string): string {
  if (!hex || !hex.startsWith('#') || hex.length !== 7) return hex;
  const num = parseInt(hex.slice(1), 16);
  const R = Math.round(((num >> 16) & 0xff) * 0.18);
  const G = Math.round(((num >> 8) & 0xff) * 0.18);
  const B = Math.round((num & 0xff) * 0.18);
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1).toUpperCase()}`;
}

// Generate color set from a base color
function generateColorSet(baseColor: string): ColorPreset {
  return {
    name: 'Custom',
    light: {
      secondary: baseColor,
      tertiary: adjustBrightness(baseColor, 5),
      card: adjustBrightness(baseColor, -5),
    },
    dark: {
      secondary: toDarkVariant(baseColor),
      tertiary: adjustBrightness(toDarkVariant(baseColor), -5),
      card: adjustBrightness(toDarkVariant(baseColor), 3),
    },
  };
}

// Apply colors directly to DOM
function applyColorsToDOM(colors: ColorSet) {
  const root = document.documentElement;
  root.style.setProperty('--color-bg-secondary', colors.secondary);
  root.style.setProperty('--color-bg-tertiary', colors.tertiary);
  root.style.setProperty('--color-bg-card', colors.card);
}

// Clear custom colors from DOM
function clearColorsFromDOM() {
  const root = document.documentElement;
  root.style.removeProperty('--color-bg-secondary');
  root.style.removeProperty('--color-bg-tertiary');
  root.style.removeProperty('--color-bg-card');
}

export function ThemeCustomizer() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPreset, setCurrentPreset] = useState<ColorPreset>(DEFAULT_PRESET);
  const [customColor, setCustomColor] = useState(DEFAULT_PRESET.light.secondary);
  const [brightness, setBrightness] = useState(0);
  const [isCustom, setIsCustom] = useState(false);
  const [copied, setCopied] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Determine current mode based on actual DOM state
  const isDarkMode = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');

  // Load saved colors on mount
  useEffect(() => {
    if (!mounted || initialized) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: ColorPreset = JSON.parse(saved);
        setCurrentPreset(parsed);
        setCustomColor(parsed.light.secondary);
        setIsCustom(parsed.name === 'Custom');

        // Apply immediately based on current mode
        const currentMode = document.documentElement.classList.contains('dark');
        const colors = currentMode ? parsed.dark : parsed.light;
        applyColorsToDOM(colors);
      } catch {
        // Use defaults
      }
    }
    setInitialized(true);
  }, [mounted, initialized]);

  // Re-apply colors when theme changes
  useEffect(() => {
    if (!mounted || !initialized) return;

    const colors = theme === 'dark' ? currentPreset.dark : currentPreset.light;
    applyColorsToDOM(colors);
  }, [theme, mounted, initialized, currentPreset]);

  const handlePresetClick = (preset: ColorPreset) => {
    setCurrentPreset(preset);
    setCustomColor(preset.light.secondary);
    setBrightness(0);
    setIsCustom(false);

    // Apply immediately
    const colors = theme === 'dark' ? preset.dark : preset.light;
    applyColorsToDOM(colors);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preset));
  };

  const handleCustomColorChange = (color: string) => {
    if (!color || color.length !== 7) return;

    setCustomColor(color);
    setBrightness(0);
    const newPreset = generateColorSet(color);
    setCurrentPreset(newPreset);
    setIsCustom(true);

    // Apply immediately
    const colors = theme === 'dark' ? newPreset.dark : newPreset.light;
    applyColorsToDOM(colors);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreset));
  };

  const handleBrightnessChange = (value: number) => {
    setBrightness(value);
    const baseColor = isCustom ? customColor : currentPreset.light.secondary;
    const adjustedColor = adjustBrightness(baseColor, value);
    const newPreset = generateColorSet(adjustedColor);
    setCurrentPreset(newPreset);

    // Apply immediately
    const colors = theme === 'dark' ? newPreset.dark : newPreset.light;
    applyColorsToDOM(colors);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreset));
  };

  const handleReset = () => {
    setCurrentPreset(DEFAULT_PRESET);
    setCustomColor(DEFAULT_PRESET.light.secondary);
    setBrightness(0);
    setIsCustom(false);
    clearColorsFromDOM();
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleCopyColor = () => {
    const colors = theme === 'dark' ? currentPreset.dark : currentPreset.light;
    navigator.clipboard.writeText(colors.secondary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentColors = theme === 'dark' ? currentPreset.dark : currentPreset.light;

  if (!mounted) return null;

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[60] p-3 rounded-full bg-text-primary text-bg-primary shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        aria-label="Customize theme"
      >
        <Palette className="w-5 h-5" />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[70] bg-black/20 backdrop-blur-sm"
            />

            {/* Side Panel */}
            <motion.div
              initial={{ opacity: 0, x: -320 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -320 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-[80] w-80 bg-bg-primary border-r border-border-default shadow-xl overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-display font-bold text-lg">Appearance</h3>
                    <p className="text-xs text-text-muted mt-0.5">Customize your experience</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full border border-border-default hover:border-text-muted transition-colors cursor-pointer"
                    aria-label="Close panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Theme Mode Toggle */}
                <div className="mb-8">
                  <p className="small-caps text-text-muted mb-3">Mode</p>
                  <div className="flex rounded-full border border-border-default p-1">
                    <button
                      onClick={() => theme !== 'light' && toggleTheme()}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                        theme === 'light'
                          ? 'bg-text-primary text-bg-primary'
                          : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                      Light
                    </button>
                    <button
                      onClick={() => theme !== 'dark' && toggleTheme()}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                        theme === 'dark'
                          ? 'bg-text-primary text-bg-primary'
                          : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                      Dark
                    </button>
                  </div>
                </div>

                {/* Info box */}
                <div className="mb-6 p-3 rounded-lg border border-border-default" style={{ backgroundColor: currentColors.secondary + '30' }}>
                  <p className="text-xs text-text-secondary">
                    Customize accent sections like &quot;Fundamentals&quot; and other highlighted areas.
                  </p>
                </div>

                {/* Current Color Preview */}
                <div className="mb-8">
                  <p className="small-caps text-text-muted mb-3">Accent Palette</p>
                  <div className="p-4 rounded-lg border border-border-default">
                    <div className="flex gap-2 mb-3">
                      <div
                        className="flex-1 h-14 rounded-lg border border-border-default relative overflow-hidden"
                        style={{ backgroundColor: currentColors.secondary }}
                      >
                        <span
                          className="absolute bottom-1 left-2 text-[9px] uppercase tracking-wider"
                          style={{ color: theme === 'dark' ? '#fff' : '#000', opacity: 0.6 }}
                        >
                          Main
                        </span>
                      </div>
                      <div
                        className="w-10 h-14 rounded-lg border border-border-default"
                        style={{ backgroundColor: currentColors.tertiary }}
                      />
                      <div
                        className="w-10 h-14 rounded-lg border border-border-default"
                        style={{ backgroundColor: currentColors.card }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{currentPreset.name}</span>
                      <button
                        onClick={handleCopyColor}
                        className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors cursor-pointer flex items-center gap-1"
                      >
                        {currentColors.secondary.toUpperCase()}
                        {copied && <Check className="w-3 h-3 text-green-600" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Color Presets */}
                <div className="mb-8">
                  <p className="small-caps text-text-muted mb-3">Presets</p>
                  <div className="grid grid-cols-4 gap-3">
                    {colorPresets.map((preset) => {
                      const previewColor = theme === 'dark' ? preset.dark.secondary : preset.light.secondary;
                      const isSelected = currentPreset.name === preset.name && !isCustom;
                      return (
                        <button
                          key={preset.name}
                          onClick={() => handlePresetClick(preset)}
                          className={`group relative aspect-square rounded-lg border-2 transition-all hover:scale-105 cursor-pointer ${
                            isSelected
                              ? 'border-text-primary shadow-md'
                              : 'border-transparent hover:border-border-hover'
                          }`}
                          style={{ backgroundColor: previewColor }}
                          title={preset.name}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Check
                                className="w-4 h-4 drop-shadow-sm"
                                style={{ color: theme === 'dark' ? '#fff' : '#000' }}
                              />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Color Picker */}
                <div className="mb-8">
                  <p className="small-caps text-text-muted mb-3">Custom Color</p>
                  <div className="flex gap-3">
                    <div className="relative">
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => handleCustomColorChange(e.target.value)}
                        className="w-14 h-14 rounded-lg border border-border-default cursor-pointer"
                      />
                      {isCustom && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-text-primary flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-bg-primary" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={customColor.toUpperCase()}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                            setCustomColor(val);
                            if (val.length === 7) {
                              handleCustomColorChange(val);
                            }
                          }
                        }}
                        placeholder="#C9D2C5"
                        maxLength={7}
                        className="w-full h-14 px-4 rounded-lg border border-border-default bg-transparent font-mono text-sm uppercase focus:outline-none focus:border-text-muted transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Brightness Adjustment */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <p className="small-caps text-text-muted">Brightness</p>
                    <span className="text-xs font-mono text-text-muted">
                      {brightness > 0 ? '+' : ''}{brightness}%
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="-30"
                      max="30"
                      value={brightness}
                      onChange={(e) => handleBrightnessChange(parseInt(e.target.value))}
                      className="w-full h-3 rounded-full cursor-pointer"
                      style={{
                        background: `linear-gradient(to right,
                          ${adjustBrightness(currentColors.secondary, -30)},
                          ${currentColors.secondary},
                          ${adjustBrightness(currentColors.secondary, 30)}
                        )`,
                      }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-0.5 h-5 bg-text-primary/30 pointer-events-none"
                      style={{ left: '50%' }}
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className="w-full py-3 px-4 rounded-full border border-border-default text-xs uppercase tracking-wider hover:bg-text-primary hover:text-bg-primary transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset to Default
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
