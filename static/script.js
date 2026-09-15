/* =========================================================
   NUSHRAT JAHAN RIA — PORTFOLIO
   FULL JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. THEME
    ===================================================== */

    const root = document.documentElement;

    const themeButton =
        document.getElementById("theme-toggle");

    const savedTheme =
        localStorage.getItem("theme");

    const preferredTheme =
        window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";


    const initialTheme =
        savedTheme || preferredTheme;


    root.setAttribute(
        "data-theme",
        initialTheme
    );


    function updateThemeButton() {

        if (!themeButton) return;

        const currentTheme =
            root.getAttribute("data-theme");

        themeButton.setAttribute(
            "aria-label",
            currentTheme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

    }


    updateThemeButton();


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


                updateThemeButton();

            }
        );

    }



    /* =====================================================
       02. SMOOTH SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(link => {

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


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });



    /* =====================================================
       03. FIXED SIDEBAR ACTIVE SECTION
    ===================================================== */

    const sidebarLinks =
        document.querySelectorAll(
            ".side-nav a[href^='#']"
        );


    const sectionIds = [];


    sidebarLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        if (
            href &&
            href !== "#" &&
            href.startsWith("#")
        ) {

            const id =
                href.substring(1);

            if (
                !sectionIds.includes(id)
            ) {
                sectionIds.push(id);
            }

        }

    });



    const sections =
        sectionIds
            .map(id =>
                document.getElementById(id)
            )
            .filter(Boolean);



    function setActiveNav(id) {

        sidebarLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            const active =
                href === `#${id}`;


            link.classList.toggle(
                "active",
                active
            );

        });

    }



    /*
       Detect which section is active
       based on a point around 30% down
       the viewport.
    */

    function updateActiveSection() {

        if (!sections.length) {
            return;
        }


        const marker =
            window.scrollY +
            window.innerHeight * 0.30;


        let current =
            sections[0].id;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;


            if (
                marker >= sectionTop
            ) {

                current =
                    section.id;

            }

        });


        setActiveNav(
            current
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveSection,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        updateActiveSection
    );


    updateActiveSection();



    /*
       Immediately highlight clicked sidebar item
    */

    sidebarLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                const href =
                    link.getAttribute("href");


                if (
                    href &&
                    href !== "#"
                ) {

                    setActiveNav(
                        href.substring(1)
                    );

                }

            }
        );

    });



    /* =====================================================
       04. ABOUT SECTION INSIDE LANDING
    ===================================================== */

    /*
       If #about is physically inside the landing page,
       offsetTop can behave differently depending on layout.

       This observer improves Home/About switching.
    */

    const aboutSection =
        document.getElementById(
            "about"
        );


    if (aboutSection) {

        const aboutObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting &&
                                entry.intersectionRatio > 0.25
                            ) {

                                setActiveNav(
                                    "about"
                                );

                            }

                        }
                    );

                },

                {
                    threshold:
                        [
                            0.25,
                            0.4,
                            0.6
                        ]
                }

            );


        aboutObserver.observe(
            aboutSection
        );

    }



    /* =====================================================
       05. MOBILE MENU
    ===================================================== */

    const menuButton =
        document.getElementById(
            "menu-button"
        );

    const mobileMenu =
        document.getElementById(
            "mobile-menu"
        );


    if (
        menuButton &&
        mobileMenu
    ) {

        menuButton.addEventListener(
            "click",
            () => {

                const opened =
                    mobileMenu.classList.toggle(
                        "open"
                    );


                menuButton.setAttribute(
                    "aria-expanded",
                    opened
                        ? "true"
                        : "false"
                );

            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove(
                            "open"
                        );


                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }



    /* =====================================================
       06. CUSTOM CURSOR
    ===================================================== */

    const cursorDot =
        document.getElementById(
            "cursor-dot"
        );

    const cursorRing =
        document.getElementById(
            "cursor-ring"
        );


    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (
        cursorDot &&
        cursorRing &&
        finePointer
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
                ) * 0.15;


            ringY +=
                (
                    mouseY -
                    ringY
                ) * 0.15;


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


        document.addEventListener(
            "mouseleave",
            () => {

                cursorDot.style.opacity =
                    "0";

                cursorRing.style.opacity =
                    "0";

            }
        );

    }



    /* =====================================================
       07. FLEXEE CASE STUDY
    ===================================================== */

    const caseButtons =
        document.querySelectorAll(
            ".case-button"
        );


    caseButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.case;


                if (!id) return;


                const panel =
                    document.getElementById(
                        `case-${id}`
                    );


                if (!panel) return;


                const opened =
                    panel.classList.toggle(
                        "open"
                    );


                /*
                   Find the text node safely.
                   Does not assume exact child structure.
                */

                const textNodes =
                    Array.from(
                        button.childNodes
                    ).filter(
                        node =>
                            node.nodeType ===
                            Node.TEXT_NODE
                    );


                if (
                    textNodes.length
                ) {

                    textNodes[0].textContent =
                        opened
                            ? " Close case study "
                            : " Explore case study ";

                }


                button.setAttribute(
                    "aria-expanded",
                    opened
                        ? "true"
                        : "false"
                );

            }
        );

    });



    /* =====================================================
       08. HCI PROCESS
    ===================================================== */

    const processData = {

        observe: {

            index: "01",

            title:
                "Observe real practices",

            description:
                "Start with people rather than a predetermined technological solution. Understand tools, breakdowns, workarounds, communication patterns, and context.",

            methods: [
                "Interview",
                "Observation",
                "Contextual Inquiry",
                "Think-Aloud"
            ]

        },


        interpret: {

            index: "02",

            title:
                "Interpret the patterns",

            description:
                "Move from individual observations toward recurring behaviors, tensions, needs, and design opportunities.",

            methods: [
                "Qualitative Coding",
                "Affinity Mapping",
                "Thematic Analysis",
                "Triangulation"
            ]

        },


        design: {

            index: "03",

            title:
                "Explore the design space",

            description:
                "Translate findings into possible interactions without prematurely committing to a single implementation.",

            methods: [
                "Sketching",
                "Storyboarding",
                "Design Alternatives",
                "Scenario Building"
            ]

        },


        probe: {

            index: "04",

            title:
                "Build enough to learn",

            description:
                "Develop technical or experiential probes that make interaction ideas concrete enough for people to react to.",

            methods: [
                "Technical Probe",
                "Wizard-of-Oz",
                "Prototype",
                "Interaction Mockup"
            ]

        },


        evaluate: {

            index: "05",

            title:
                "Evaluate in context",

            description:
                "Study how people actually use the system, where interaction succeeds or breaks down, and what should change next.",

            methods: [
                "User Study",
                "Interview",
                "Behavioral Analysis",
                "Iteration"
            ]

        }

    };


    const processTabs =
        document.querySelectorAll(
            ".process-tab"
        );


    const processIndex =
        document.getElementById(
            "process-index"
        );


    const processTitle =
        document.getElementById(
            "process-title"
        );


    const processDescription =
        document.getElementById(
            "process-description"
        );


    const methodCloud =
        document.getElementById(
            "method-cloud"
        );


    if (
        processTabs.length &&
        processIndex &&
        processTitle &&
        processDescription &&
        methodCloud
    ) {

        processTabs.forEach(tab => {

            tab.addEventListener(
                "click",
                () => {

                    const key =
                        tab.dataset.process;


                    const data =
                        processData[key];


                    if (!data) return;


                    processTabs.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    tab.classList.add(
                        "active"
                    );


                    processIndex.textContent =
                        data.index;


                    processTitle.textContent =
                        data.title;


                    processDescription.textContent =
                        data.description;


                    methodCloud.innerHTML =
                        data.methods
                            .map(
                                method =>
                                    `<span>${method}</span>`
                            )
                            .join("");

                }
            );

        });

    }



    /* =====================================================
       09. RESEARCH LENS
    ===================================================== */

    const lensData = {

        questions: [

            "How do people preserve context during collaborative sensemaking?",

            "When should AI act proactively, and when should it wait?",

            "How can interaction span documents, devices, and modalities?"

        ],


        methods: [

            "Formative studies reveal practices before systems are designed.",

            "Technical probes help participants experience possible interactions.",

            "Qualitative analysis connects observed behavior to design opportunities."

        ],


        interaction: [

            "Speech can communicate intent without leaving the current artifact.",

            "Gesture and pointing can establish shared visual reference.",

            "Pen and touch can support lightweight externalization of thought."

        ],


        systems: [

            "Collaborative workspaces that maintain references between artifacts.",

            "Context-aware AI assistants for collaborative information work.",

            "Multimodal interfaces spanning desktop, tablet, and shared displays."

        ]

    };


    const lensButtons =
        document.querySelectorAll(
            ".lens-button"
        );


    const lensDisplay =
        document.getElementById(
            "lens-display"
        );


    if (
        lensButtons.length &&
        lensDisplay
    ) {

        lensButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const key =
                        button.dataset.lens;


                    const items =
                        lensData[key];


                    if (!items) return;


                    lensButtons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    lensDisplay.innerHTML =
                        items
                            .map(
                                (
                                    text,
                                    index
                                ) => `

                                    <article>

                                        <span>
                                            ${String(
                                                index + 1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <h3>
                                            ${text}
                                        </h3>

                                    </article>

                                `
                            )
                            .join("");

                }
            );

        });

    }



    /* =====================================================
       10. PUBLICATION FILTERS
    ===================================================== */

    const publicationFilters =
        document.querySelectorAll(
            ".pub-filter"
        );


    const publicationItems =
        document.querySelectorAll(
            ".publication-item"
        );


    if (
        publicationFilters.length &&
        publicationItems.length
    ) {

        publicationFilters.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        publicationFilters.forEach(
                            filterButton => {

                                filterButton.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        const filter =
                            button.dataset.filter;


                        publicationItems.forEach(
                            item => {

                                const categoryString =
                                    item.dataset.category ||
                                    "";


                                const categories =
                                    categoryString.split(
                                        " "
                                    );


                                const visible =
                                    filter === "all" ||
                                    categories.includes(
                                        filter
                                    );


                                item.classList.toggle(
                                    "hidden",
                                    !visible
                                );

                            }
                        );

                    }
                );

            }
        );

    }



    /* =====================================================
       11. PROJECT CARD / MODE CHIP INTERACTIONS
    ===================================================== */

    const modeChips =
        document.querySelectorAll(
            ".mode-chip"
        );


    modeChips.forEach(chip => {

        chip.addEventListener(
            "click",
            () => {

                modeChips.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                chip.classList.add(
                    "active"
                );

            }
        );

    });



    /* =====================================================
       12. OPTIONAL PROJECT CARD TILT
    ===================================================== */

    const projectVisuals =
        document.querySelectorAll(
            ".compact-visual, .project-card-visual"
        );


    if (finePointer) {

        projectVisuals.forEach(
            visual => {

                visual.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            visual
                                .getBoundingClientRect();


                        const x =
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width -
                            0.5;


                        const y =
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height -
                            0.5;


                        visual.style.transform =
                            `
                                perspective(900px)
                                rotateY(${x * 2}deg)
                                rotateX(${y * -2}deg)
                            `;

                    }
                );


                visual.addEventListener(
                    "mouseleave",
                    () => {

                        visual.style.transform =
                            "";

                    }
                );

            }
        );

    }



    /* =====================================================
       13. SCROLL REVEAL
    ===================================================== */

    const revealTargets =
        document.querySelectorAll(
            `
            .news-item,
            .publication-item,
            .compact-project,
            .achievement-card,
            .teaching-item,
            .timeline-item,
            .project-item
            `
        );


    if (
        revealTargets.length &&
        "IntersectionObserver" in window
    ) {

        revealTargets.forEach(
            element => {

                element.classList.add(
                    "reveal-item"
                );

            }
        );


        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "revealed"
                                    );


                                revealObserver
                                    .unobserve(
                                        entry.target
                                    );

                            }

                        }
                    );

                },

                {
                    threshold: 0.08
                }

            );


        revealTargets.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    }



    /* =====================================================
       14. CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.getElementById(
            "current-year"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateActiveSection();


    console.log(
        "Nushrat portfolio JS loaded successfully."
    );

});