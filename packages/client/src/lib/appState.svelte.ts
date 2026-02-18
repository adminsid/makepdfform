export function createAppState() {
  let isDarkMode = $state(false);

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme');
    if (saved) {
      isDarkMode = saved === 'dark';
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }

  return {
    get isDarkMode() { return isDarkMode; },
    set isDarkMode(value: boolean) { 
      isDarkMode = value;
      if (typeof document !== 'undefined') {
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      }
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    }
  };
}

export const appState = createAppState();
