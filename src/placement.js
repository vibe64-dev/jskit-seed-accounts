import { createPlacementRegistry } from "@jskit-ai/shell-web/client/placement";

const registry = createPlacementRegistry();
const { addPlacement } = registry;

export { addPlacement };

// Keep the default export near the top so module installers can append addPlacement(...)
// blocks at the bottom of this file without changing the export section.
export default function getPlacements() {
  return registry.build();
}

addPlacement({
  id: "shell-web.home.menu.home",
  target: "shell.primary-nav",
  kind: "link",
  surfaces: ["home"],
  order: 50,
  props: {
    label: "Home",
    surface: "home",
    scopedSuffix: "/",
    unscopedSuffix: "/",
    exact: true
  }
});

addPlacement({
  id: "shell-web.home.menu.settings",
  target: "shell.primary-nav",
  kind: "link",
  surfaces: ["home"],
  order: 100,
  props: {
    label: "Settings",
    surface: "home",
    scopedSuffix: "/settings",
    unscopedSuffix: "/settings"
  }
});

addPlacement({
  id: "shell-web.home.settings.general",
  target: "page.section-nav",
  owner: "home-settings",
  kind: "link",
  surfaces: ["home"],
  order: 100,
  props: {
    label: "General",
    surface: "home",
    scopedSuffix: "/settings/general",
    unscopedSuffix: "/settings/general"
  }
});


addPlacement({
  id: "auth.profile.widget",
  target: "shell.status",
  kind: "component",
  surfaces: ["*"],
  order: 1000,
  componentToken: "auth.web.profile.widget"
});

addPlacement({
  id: "auth.profile.menu.sign-in",
  target: "auth.profile-menu",
  kind: "link",
  surfaces: ["*"],
  order: 200,
  props: {
    label: "Sign in",
    to: "/auth/login"
  },
  when: ({ auth }) => auth?.authenticated !== true
});

addPlacement({
  id: "auth.profile.menu.sign-out",
  target: "auth.profile-menu",
  kind: "link",
  surfaces: ["*"],
  order: 1000,
  props: {
    label: "Sign out",
    to: "/auth/signout"
  },
  when: ({ auth }) => auth?.authenticated === true
});
addPlacement({
  id: "shell-web.home.profile-menu.preferences",
  target: "auth.profile-menu",
  kind: "link",
  surfaces: ["*"],
  order: 500,
  props: {
    label: "User preferences",
    to: "/home/settings/general"
  },
  when: ({ auth }) => auth?.authenticated === true
});
