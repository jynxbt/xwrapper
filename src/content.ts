// Type definitions
interface LinkConfig {
    href: string;
  }
  
  interface ElementConfig {
    selector: string;
    context?: string;
    parentLevels?: number;
  }
  
  interface ExtensionConfig {
    linksToRemove: LinkConfig[];
    elementsToRemove: ElementConfig[];
    settingsIcon: string;
  }
  
  // Configuration
  const CONFIG: ExtensionConfig = {
    linksToRemove: [
      { href: '/i/grok' },
      { href: '/i/verified-orgs-signup' },
      { href: '/i/premium' },
      { href: '/messages' }
    ],
    elementsToRemove: [
      { selector: 'button[data-testid="AppTabBar_More_Menu"]', context: 'nav' },
      { selector: 'div[data-testid="GrokDrawer"]', parentLevels: 2 },
      { selector: 'main div[data-testid="sidebarColumn"]' },
      { selector: 'nav[aria-label="Footer"]', parentLevels: 1 },
      { selector: 'aside[aria-label="Who to follow"]', parentLevels: 2 },
      { selector: 'header h1[role="heading"]', parentLevels: 1 }
    ],
    settingsIcon: `M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z`
  };
  
  /**
   * TwitterUI - Handles UI modifications for Twitter/X
   */
  class TwitterUI {
    /**
     * Removes specified links from the navigation
     */
    static cleanNavigation(): void {
      const nav = document.querySelector('nav');
      if (!nav) return;
  
      // Center the header navigation
      const headerNav = document.querySelector('header nav');
      if (headerNav?.parentElement?.parentElement?.parentElement) {
        headerNav.parentElement.parentElement.parentElement.style.setProperty('justify-content', 'center');
      }
  
      // Remove configured links
      CONFIG.linksToRemove.forEach(({ href }) => {
        nav.querySelectorAll(`a[href="${href}"]`).forEach(el => el?.remove());
      });
    }
  
    /**
     * Removes specified UI elements
     */
    static cleanUI(): void {
      CONFIG.elementsToRemove.forEach(({ selector, context, parentLevels = 0 }) => {
        const contextElement = context ? document.querySelector(context) : document;
        if (!contextElement) return;
  
        const element = contextElement.querySelector(selector);
        if (!element) return;
  
        let targetElement: Element | null = element;
        for (let i = 0; i < parentLevels; i++) {
          if (targetElement?.parentElement) {
            targetElement = targetElement.parentElement;
          } else {
            break;
          }
        }
        
        targetElement?.remove();
      });
    }
  
    /**
     * Adds a Settings link to the navigation
     */
    static addSettingsLink(): void {
      const profileLink = document.querySelector('a[data-testid="AppTabBar_Profile_Link"]');
      const duplicateExists = document.querySelector('.prf-settings-link');
      
      if (profileLink && !duplicateExists) {
        // Clone the profile link
        const settingsLink = profileLink.cloneNode(true) as HTMLElement;
        settingsLink.classList.add('prf-settings-link');
        
        // Update attributes
        settingsLink.setAttribute('href', '/settings');
        settingsLink.setAttribute('aria-label', 'Go to Settings');
        settingsLink.setAttribute('data-testid', 'AppTabBar_Settings_Link');
        
        // Update text content
        settingsLink.querySelectorAll('span').forEach(span => {
          if (span.textContent?.trim().toLowerCase() === 'profile') {
            span.textContent = 'Settings';
          }
        });
        
        // Replace icon
        const svg = settingsLink.querySelector('svg');
        if (svg) {
          // Clear existing icon paths
          while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
          }
          
          // Add settings icon
          const newG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          newPath.setAttribute('d', CONFIG.settingsIcon);
          newG.appendChild(newPath);
          svg.appendChild(newG);
        }
        
        // Add to navigation
        profileLink.parentNode?.insertBefore(settingsLink, profileLink.nextSibling);
      }
    }
  
    /**
     * Performs all UI modifications
     */
    static applyModifications(): void {
      this.cleanNavigation();
      this.cleanUI();
      this.addSettingsLink();
    }
  }
  
  /**
   * Initialize extension and set up mutation observer
   */
  (function(): void {
    // Apply modifications immediately
    TwitterUI.applyModifications();
    
    // Set up mutation observer for SPA navigation
    const observer = new MutationObserver(() => {
      TwitterUI.applyModifications();
    });
    
    // Start observing DOM changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  })();