document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* =====================================================
           THEME
        ===================================================== */

        const root =
            document.documentElement;

        const themeButton =
            document.getElementById(
                "theme-toggle"
            );


        const savedTheme =
            localStorage.getItem(
                "theme"
            );


        const preferredTheme =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light";


        root.setAttribute(
            "data-theme",
            savedTheme || preferredTheme
        );


        if (themeButton) {

            themeButton.addEventListener(
                "click",
                () => {

                    const current =
                        root.getAttribute(
                            "data-theme"
                        );


                    const next =
                        current === "dark"
                            ? "light"
                            : "dark";


                    root.setAttribute(
                        "data-theme",
                        next
                    );


                    localStorage.setItem(
                        "theme",
                        next
                    );

                }
            );

        }



        /* =====================================================
           CUSTOM CURSOR
        ===================================================== */

        const cursorDot =
            document.getElementById(
                "cursor-dot"
            );


        const cursorRing =
            document.getElementById(
                "cursor-ring"
            );


        if (
            cursorDot &&
            cursorRing &&
            window.matchMedia(
                "(pointer: fine)"
            ).matches
        ) {

            let mouseX = 0;
            let mouseY = 0;

            let ringX = 0;
            let ringY = 0;


            document.addEventListener(
                "mousemove",
                event => {

                    mouseX =
                        event.clientX;

                    mouseY =
                        event.clientY;


                    cursorDot.style.opacity =
                        "1";

                    cursorRing.style.opacity =
                        ".28";


                    cursorDot.style.transform =
                        `translate(
                            ${mouseX - 3}px,
                            ${mouseY - 3}px
                        )`;

                }
            );


            function animateRing() {

                ringX +=
                    (
                        mouseX -
                        ringX
                    ) * .15;


                ringY +=
                    (
                        mouseY -
                        ringY
                    ) * .15;


                cursorRing.style.transform =
                    `translate(
                        ${ringX - 17}px,
                        ${ringY - 17}px
                    )`;


                requestAnimationFrame(
                    animateRing
                );

            }


            animateRing();

        }



        /* =====================================================
           SIDEBAR ACTIVE SECTION
        ===================================================== */

        const sidebarLinks =
            Array.from(
                document.querySelectorAll(
                    '.side-nav a[href^="#"]'
                )
            );


        const trackedSections =
            sidebarLinks

                .map(
                    link => {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        return (
                            href &&
                            href.length > 1
                        )
                            ? document.getElementById(
                                href.slice(1)
                            )
                            : null;

                    }
                )

                .filter(Boolean);



        function setActiveSidebar(
            sectionId
        ) {

            sidebarLinks.forEach(
                link => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    link.classList.toggle(
                        "active",
                        href ===
                            `#${sectionId}`
                    );

                }
            );

        }



        function updateActiveSidebar() {

            const marker =
                window.scrollY +
                window.innerHeight *
                .34;


            let activeId =
                "home";


            trackedSections.forEach(
                section => {

                    const absoluteTop =
                        section
                            .getBoundingClientRect()
                            .top +
                        window.scrollY;


                    if (
                        marker >=
                        absoluteTop
                    ) {

                        activeId =
                            section.id;

                    }

                }
            );


            /*
             * At the very bottom of the page,
             * always select CV.
             */

            if (
                window.innerHeight +
                window.scrollY >=
                document
                    .documentElement
                    .scrollHeight -
                4
            ) {

                const cv =
                    document.getElementById(
                        "cv"
                    );


                if (cv) {

                    activeId =
                        "cv";

                }

            }


            setActiveSidebar(
                activeId
            );

        }



        window.addEventListener(
            "scroll",
            updateActiveSidebar,
            {
                passive: true
            }
        );


        window.addEventListener(
            "resize",
            updateActiveSidebar
        );


        window.addEventListener(
            "load",
            updateActiveSidebar
        );


        updateActiveSidebar();



        /* =====================================================
           PUBLICATION FILTERS
        ===================================================== */

        const publicationFilters =
            document.querySelectorAll(
                ".pub-filter"
            );


        const publicationItems =
            document.querySelectorAll(
                ".publication-item"
            );


        publicationFilters.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        publicationFilters
                            .forEach(
                                filter => {

                                    filter
                                        .classList
                                        .remove(
                                            "active"
                                        );

                                }
                            );


                        button
                            .classList
                            .add(
                                "active"
                            );


                        const filter =
                            button.dataset.filter;


                        publicationItems
                            .forEach(
                                item => {

                                    const categories =
                                        (
                                            item
                                                .dataset
                                                .category ||
                                            ""
                                        )
                                        .split(
                                            " "
                                        );


                                    const visible =
                                        filter ===
                                            "all" ||
                                        categories
                                            .includes(
                                                filter
                                            );


                                    item
                                        .classList
                                        .toggle(
                                            "hidden",
                                            !visible
                                        );

                                }
                            );

                    }
                );

            }
        );



        /* =====================================================
           SMOOTH INTERNAL LINKS
        ===================================================== */

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                link => {

                    link.addEventListener(
                        "click",
                        event => {

                            const href =
                                link.getAttribute(
                                    "href"
                                );


                            if (
                                !href ||
                                href === "#"
                            ) {

                                return;

                            }


                            const target =
                                document.querySelector(
                                    href
                                );


                            if (!target) {

                                return;

                            }


                            event.preventDefault();


                            target.scrollIntoView(
                                {
                                    behavior:
                                        "smooth",

                                    block:
                                        "start"
                                }
                            );


                            history.replaceState(
                                null,
                                "",
                                href
                            );

                        }
                    );

                }
            );

    }
);