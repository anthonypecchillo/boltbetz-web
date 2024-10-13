import { Outlet } from "@remix-run/react";
// import { BreadcrumbNav } from "~/components/breadcrumb-nav";
// import { GlobalSidebar } from "~/components/global-sidebar/global-sidebar";
// import { findLast } from "~/utils/array";

// function isMenu(
//   match: UIMatch,
// ): match is UIMatch<unknown, { menu: JSX.Element }> {
//   return (
//     typeof match.handle === "object" &&
//     match.handle !== null &&
//     "menu" in match.handle &&
//     isValidElement(match.handle.menu)
//   );
// }

// function isBreadcrumb(
//   match: UIMatch,
// ): match is UIMatch<unknown, { breadcrumb(match: UIMatch): JSX.Element }> {
//   return (
//     typeof match.handle === "object" &&
//     match.handle !== null &&
//     "breadcrumb" in match.handle &&
//     typeof match.handle.breadcrumb === "function"
//   );
// }

export default function Route() {
  // const matches = useMatches();
  // const breadcrumbMatches = matches.filter(isBreadcrumb);
  // const menuMatch = findLast(isMenu, matches);

  return (
    // <GlobalSidebar menu={menuMatch?.handle.menu}>
    //   <main className="flex grow flex-col">
    //     {breadcrumbMatches.length ? (
    //       <nav aria-label="Breadcrumbs">
    //         <BreadcrumbNav>
    //           {breadcrumbMatches.map((match) => (
    //             <Fragment key={match.id}>
    //               {match.handle.breadcrumb(match)}
    //             </Fragment>
    //           ))}
    //         </BreadcrumbNav>
    //       </nav>
    //     ) : undefined}
    <Outlet />
    //   </main>
    // </GlobalSidebar>
  );
}
