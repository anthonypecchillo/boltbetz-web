import {
  Form,
  Link,
  useNavigation,
  useRouteLoaderData,
} from "@remix-run/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { route } from "routes-gen";
import type { loader as rootLoader } from "~/root";
import { Avatar } from "../avatar";
// import { FlashMessage } from "../flash-message";
import { Icon } from "../icon";
import { Logo } from "../logo";
import { Spinner } from "../spinner";
import { GlobalSidebarCollapsedContext } from "./global-sidebar-collapsed-context";
import { GlobalSidebarMenuButtonItem } from "./global-sidebar-menu-button-item";

export function GlobalSidebar({
  children,
  menu,
}: {
  children: React.ReactNode;
  menu?: React.ReactNode;
}) {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  const mainMenuRef = useRef<HTMLButtonElement>(null);
  const mainMenuDesktopRef = useRef<HTMLElement>(null);
  const userMenuRef = useRef<HTMLUListElement>(null);
  const userMenuRefDesktop = useRef<HTMLUListElement>(null);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mainMenuCollapsed, setMainMenuCollapsed] = useState(false);
  const navigation = useNavigation();

  useEffect(
    function handleNavigation() {
      const state = navigation.state;
      return function handleNavigationcleanup() {
        if (state !== "idle") {
          setMainMenuOpen(false);
          setUserMenuOpen(false);
        }
      };
    },
    [navigation.state],
  );

  useEffect(function registerMenuEvents() {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (
        mainMenuDesktopRef.current &&
        mainMenuRef.current &&
        !mainMenuRef.current.contains(event.target) &&
        !mainMenuDesktopRef.current.contains(event.target)
      ) {
        setMainMenuOpen(false);
      }

      if (
        userMenuRef.current &&
        userMenuRefDesktop.current &&
        !userMenuRef.current.contains(event.target) &&
        !userMenuRefDesktop.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return function registerMenuEventsCleanup() {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative isolate flex grow flex-col lg:overflow-x-hidden">
      <div
        className={clsx({
          "lg:ml-16": mainMenuCollapsed,
          "lg:ml-60": !mainMenuCollapsed,
        })}
      >
        {/* <FlashMessage /> */}
      </div>

      {/* Header for Non-Desktop View */}
      <header className="z-10 flex items-center justify-between border-b border-gray-300 bg-blue-950 p-6 lg:hidden">
        <Link to="/wallet" className="inline-flex">
          {/* <Logo className="h-5 w-24 shrink-0" /> */}
          <Logo />
        </Link>
        {navigation.state === "idle" ? (
          <button
            ref={mainMenuRef}
            className="inline-flex appearance-none"
            onClick={() => setMainMenuOpen((prev) => !prev)}
          >
            {mainMenuOpen ? (
              <Icon name="xmark" color="white" />
            ) : (
              <Icon name="menu" color="white" />
            )}
          </button>
        ) : (
          <Spinner
            aria-label="Loading..."
            className="animate-spin fill-blue-700 text-gray-300"
            role="status"
          />
        )}
      </header>

      <div className="relative flex grow lg:gap-x-9">
        <aside
          ref={mainMenuDesktopRef}
          className={clsx(
            "fixed inset-0 z-40 flex shrink-0 flex-col bg-blue-950 transition-transform lg:fixed lg:border-r lg:border-white lg:bg-blue-950",
            {
              "-translate-x-full lg:translate-x-0": !mainMenuOpen,
              "translate-x-0": mainMenuOpen,
              "lg:w-60": !mainMenuCollapsed,
              "lg:w-16": mainMenuCollapsed,
            },
          )}
        >
          <header className="flex items-center justify-between border-b border-gray-300 bg-blue-950 p-6 lg:hidden">
            <Link to="/wallet" className="inline-flex">
              {/* <Logo className="h-5 w-24 shrink-0" /> */}
              <Logo />
            </Link>
            {navigation.state === "idle" ? (
              <button
                ref={mainMenuRef}
                className="inline-flex appearance-none"
                onClick={() => setMainMenuOpen((prev) => !prev)}
              >
                {mainMenuOpen ? (
                  <Icon name="xmark" color="white" />
                ) : (
                  <Icon name="menu" color="white" />
                )}
              </button>
            ) : (
              <Spinner
                aria-label="Loading..."
                className="animate-spin fill-blue-700 text-gray-300"
                role="status"
              />
            )}
          </header>

          <GlobalSidebarCollapsedContext.Provider value={mainMenuCollapsed}>
            <div
              className={clsx("hidden lg:flex lg:flex-col", {
                "lg:gap-y-6 lg:p-5": !mainMenuCollapsed,
                "lg:items-center lg:gap-y-3 lg:py-3": mainMenuCollapsed,
              })}
            >
              <Link
                to="/wallet"
                className={clsx("lg:inline-flex", {
                  "lg:h-8 lg:w-8 lg:items-center lg:overflow-hidden":
                    mainMenuCollapsed,
                })}
              >
                <Logo
                // className={clsx("lg:shrink-0", {
                //   "lg:w-24 lg:h-5": !mainMenuCollapsed,
                //   "lg:w-[7.5rem] lg:h-6": mainMenuCollapsed,
                // })}
                />
              </Link>
            </div>

            {menu}

            <nav className="absolute bottom-0 p-3 lg:hidden">
              <ul>
                <li>
                  <Form method="POST" action={route("/api/auth/logout")}>
                    <button className="-mt-px flex w-full gap-x-2 p-3 text-left text-red-500">
                      <span className="shrink-0">
                        <Icon name="exit" />
                      </span>
                      <span className="w-min grow whitespace-nowrap">
                        Sign out
                      </span>
                    </button>
                  </Form>
                </li>
              </ul>
            </nav>

            <nav
              className={clsx("hidden lg:flex lg:flex-col", {
                "lg:px-0 lg:pb-5": !mainMenuCollapsed,
                "lg:py-3": mainMenuCollapsed,
              })}
            >
              {/* {orgLoaderData ? (
              <GlobalSidebarMenuNavLinkItem
                  iconLeft={<Icon name="bell" />}
                  title="Notifications"
                  to={route("/organizations/:org_slug/notifications", {
                    org_slug: orgLoaderData.organization.slug,
                  })}
                >
                  Notifications
                </GlobalSidebarMenuNavLinkItem>

                <GlobalSidebarMenuNavLinkItem
                  iconLeft={<Icon name="gear" />}
                  title="Settings"
                  to={route("/organizations/:org_slug/settings", {
                    org_slug: orgLoaderData.organization.slug,
                  })}
                >
                  Settings
                </GlobalSidebarMenuNavLinkItem>
              ) : undefined} */}
              <GlobalSidebarMenuButtonItem
                aria-pressed={mainMenuCollapsed}
                title={mainMenuCollapsed ? "Expand Menu" : "Collapse Menu"}
                iconLeft={
                  <Icon
                    name={
                      mainMenuCollapsed ? "chevron.right.2" : "chevron.left.2"
                    }
                  />
                }
                onClick={() => setMainMenuCollapsed((prev) => !prev)}
              >
                {mainMenuCollapsed ? "Expand Menu" : "Collapse Menu"}
              </GlobalSidebarMenuButtonItem>
            </nav>

            {rootLoaderData?.session ? (
              <nav
                className={clsx(
                  "hidden lg:flex lg:flex-col lg:border-t lg:border-gray-300",
                  {
                    "lg:py-2": !mainMenuCollapsed,
                    "lg:py-3": mainMenuCollapsed,
                  },
                )}
                ref={userMenuRef}
              >
                <GlobalSidebarMenuButtonItem
                  aria-pressed={userMenuOpen}
                  title="My Account"
                  iconLeft={
                    rootLoaderData?.session?.boltbetzUser.first_name &&
                    rootLoaderData?.session?.boltbetzUser.image_url ? (
                      <Avatar
                        aria-hidden
                        alt={rootLoaderData?.session?.boltbetzUser.first_name}
                        src={rootLoaderData?.session?.boltbetzUser.image_url}
                        size={!mainMenuCollapsed ? "xl" : "md"}
                      />
                    ) : (
                      <Icon name="person.crop.circle" aria-hidden />
                    )
                  }
                  iconRight={<Icon name="chevron.right" />}
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                >
                  {`${rootLoaderData?.session?.boltbetzUser.first_name} ${rootLoaderData?.session?.boltbetzUser.last_name}`}
                </GlobalSidebarMenuButtonItem>
                {userMenuOpen ? (
                  <ul
                    className={clsx(
                      "lg:absolute lg:flex lg:flex-col lg:overflow-hidden lg:rounded-lg lg:bg-white lg:shadow-lg",
                      {
                        "lg:bottom-0 lg:left-0 lg:mb-4 lg:ml-20":
                          mainMenuCollapsed,
                        "lg:inset-x-0 lg:bottom-0 lg:mx-4 lg:mb-28":
                          !mainMenuCollapsed,
                      },
                    )}
                    ref={userMenuRefDesktop}
                  >
                    <li>
                      <Link
                        to={route("/wallet")}
                        className="flex gap-x-2 rounded-t-lg border-0.5 border-gray-300 p-2 text-gray-700 hover:bg-gray-100"
                      >
                        <span className="shrink-0">
                          <Icon name="organization" />
                        </span>
                        <span className="w-min grow whitespace-nowrap">
                          My Organizations
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Form method="POST" action={route("/api/auth/logout")}>
                        <button className="-mt-px flex w-full gap-x-2 rounded-b-lg border-0.5 border-gray-300 p-3 text-left text-red-500 hover:bg-gray-100">
                          <span className="shrink-0">
                            <Icon name="exit" />
                          </span>
                          <span className="w-min grow whitespace-nowrap">
                            Sign out
                          </span>
                        </button>
                      </Form>
                    </li>
                  </ul>
                ) : undefined}
              </nav>
            ) : undefined}
          </GlobalSidebarCollapsedContext.Provider>
        </aside>
        <div
          className={clsx("flex w-0 grow flex-col bg-gray-200", {
            "lg:ml-16": mainMenuCollapsed,
            "lg:ml-60": !mainMenuCollapsed,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
