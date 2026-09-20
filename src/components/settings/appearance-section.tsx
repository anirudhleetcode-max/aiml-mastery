'use client';

import * as React from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/input';
import { useLearnerStore } from '@/lib/store/learner';
import { useUIPrefs } from '@/lib/store/ui';
import { cn } from '@/lib/cn';
import type { SettingsData } from './types';

const THEMES = [
  { value: 'light', label: 'Light', icon: Sun, detail: 'A bright page. Easier in daylight and on projectors.' },
  { value: 'dark', label: 'Dark', icon: Moon, detail: 'A dark page. Easier late at night and on OLED screens.' },
  { value: 'system', label: 'System', icon: Monitor, detail: 'Follows your operating system and changes with it.' },
] as const;

const MIN_SCALE = 85;
const MAX_SCALE = 140;

/**
 * Appearance is applied locally first — a theme change that waits on a network
 * round trip feels broken — and then recorded on the account so the same
 * choice greets the learner on their next device.
 */
export function AppearanceSection({ data }: { data: SettingsData }) {
  const [prefs, update] = useUIPrefs();
  const emit = useLearnerStore((s) => s.emit);
  const scaleTouched = React.useRef(false);

  React.useEffect(() => {
    if (!scaleTouched.current) return;
    const timer = setTimeout(() => emit({ type: 'prefs-updated', fontScale: prefs.fontScale }), 600);
    return () => clearTimeout(timer);
  }, [prefs.fontScale, emit]);

  function setTheme(theme: 'light' | 'dark' | 'system') {
    update({ theme });
    emit({ type: 'prefs-updated', theme });
  }

  function setReduceMotion(reduceMotion: boolean) {
    update({ reduceMotion });
    emit({ type: 'prefs-updated', reduceMotion });
  }

  function setHighContrast(highContrast: boolean) {
    update({ highContrast });
    emit({ type: 'prefs-updated', highContrast });
  }

  function setScale(fontScale: number) {
    scaleTouched.current = true;
    update({ fontScale });
  }

  const accountDiffers =
    data.settings.theme !== prefs.theme ||
    data.settings.reduceMotion !== prefs.reduceMotion ||
    data.settings.highContrast !== prefs.highContrast ||
    data.settings.fontScale !== prefs.fontScale;

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="text-[13px] font-medium text-ink">Theme</legend>
        <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-subtle">
          Changes the colour of every page straight away. Charts, code samples and diagrams are all authored for
          both themes, so nothing becomes unreadable either way.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Colour theme">
          {THEMES.map(({ value, label, icon: Icon, detail }) => {
            const active = prefs.theme === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setTheme(value)}
                className={cn(
                  'rounded-xl border p-3.5 text-left transition-colors',
                  active ? 'border-primary/50 bg-primary/8' : 'border-line hover:border-line-strong',
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon size={15} className={active ? 'text-primary-ink' : 'text-subtle'} aria-hidden />
                  <span className="text-[14px] font-medium text-ink">{label}</span>
                </span>
                <span className="mt-1 block text-[12px] leading-relaxed text-subtle">{detail}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="divide-y divide-line rounded-xl border border-line px-4">
        <Switch
          id="set-reduce-motion"
          checked={prefs.reduceMotion}
          onChange={setReduceMotion}
          label="Reduced motion"
          description="Stops progress bars, charts and page transitions from animating. Content still updates; it simply appears instead of sliding, which helps if movement makes you queasy or distracts you."
        />
        <Switch
          id="set-high-contrast"
          checked={prefs.highContrast}
          onChange={setHighContrast}
          label="High contrast"
          description="Strengthens borders and text against their backgrounds. Worth turning on if thin dividers or muted captions are hard to pick out."
        />
      </div>

      <div>
        <label htmlFor="set-font-scale" className="text-[13px] font-medium text-ink">
          Font size
        </label>
        <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-subtle">
          Scales all text on the platform between {MIN_SCALE}% and {MAX_SCALE}% of its normal size. Layouts reflow
          rather than clip, so lessons stay readable at the largest setting.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <input
            id="set-font-scale"
            type="range"
            min={MIN_SCALE}
            max={MAX_SCALE}
            step={5}
            value={prefs.fontScale}
            onChange={(e) => setScale(Number(e.target.value))}
            aria-valuetext={`${prefs.fontScale} percent`}
            className="h-2 w-full max-w-xs cursor-pointer appearance-none rounded-full bg-surface-3 accent-[hsl(var(--c-primary))]"
          />
          <span className="text-[13px] font-medium tabular-nums text-ink">{prefs.fontScale}%</span>
          {prefs.fontScale !== 100 && (
            <button
              type="button"
              onClick={() => setScale(100)}
              className="text-[12.5px] font-medium text-primary-ink hover:underline"
            >
              Reset to 100%
            </button>
          )}
        </div>
        <p className="mt-3 rounded-lg border border-line bg-surface-2 p-3 text-[13px] leading-relaxed text-muted">
          The whole page resizes as you move this slider, so this sentence is the preview: gradient descent walks
          downhill on the loss surface, one small step at a time.
        </p>
      </div>

      <p className="text-[12px] leading-relaxed text-subtle">
        {accountDiffers
          ? 'These choices apply to this device immediately and are being saved to your account, so the next device you sign in on starts the same way.'
          : 'These choices apply to this device immediately and are saved to your account, so the next device you sign in on starts the same way.'}
      </p>
    </div>
  );
}
