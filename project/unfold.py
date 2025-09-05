from django.templatetags.static import static
from django.utils.translation import gettext_lazy as _
from django.urls import reverse_lazy

unfold = {
    "SITE_TITLE": "djwind",
    "SITE_HEADER": "djwind",
    "SITE_SUBHEADER": "Django Tailwind Template by @kimbrenekakande",
    "SITE_DROPDOWN": [
        {
            "icon": "diamond",
            "title": _('Home Page'),
            "link": "http://127.0.0.1:8000/",
        },
        # ...
    ],
    "SITE_URL": "/",
    # "SITE_ICON": lambda request: static("icon.svg"),  # both modes, optimise for 32px height
    "SITE_ICON": {
        "light": lambda request: static("svgs/settings.svg"),  # light mode
        "dark": lambda request: static("svgs/settings.svg"),  # dark mode
    },
    # "SITE_LOGO": lambda request: static("logo.svg"),  # both modes, optimise for 32px height
    "SITE_LOGO": {
        "light": lambda request: static("svgs/settings.svg"),  # light mode
        "dark": lambda request: static("svgs/settings.svg"),  # dark mode
    },
    "SITE_SYMBOL": "speed",  # symbol from icon set
    "SITE_FAVICONS": [
        {
            "rel": "icon",
            "sizes": "32x32",
            "type": "image/svg+xml",
            "href": lambda request: static("favicon.svg"),
        },
    ],
    
    "COLORS": {
        "base": {
            "50": "249, 250, 251", #sidebar LIGHT
            "100": "249,250,251", #Active tabs + body headers LIGHT
            "200": "229, 231, 235", #main section border color LIGHT
            "300": "209, 213, 219", #text color dark
            "400": "156, 163, 175", #few icons / search bar placeholder text
            "500": "107, 114, 128", #majority of icons dark
            "600": "75, 85, 99", #Text color LIGHT
            "700": "55, 65, 81", # inputs boarder color dark /hoover shadow dark
            "800": "31, 41, 55", #main section border color dark
            "900": "0,0,0", #body color dark
            "950": "3, 7, 18", #kinda faint color behind the sidebar dark
        },
        "primary": {
            "50": "250, 245, 255",
            "100": "243, 232, 255",
            "200": "233, 213, 255",
            "300": "216, 180, 254",
            "400": "192, 132, 252",
            "500": "249, 115, 22", #hoover, active tabs and buttons dark
            "600": "249, 115, 22", #main positive buttons dark (dark and light) +  nav hoover and active tabs LIGHT
            "700": "126, 34, 206",
            "800": "107, 33, 168",
            "900": "88, 28, 135",
            "950": "124, 252, 0",
        },
    },
    "SIDEBAR": {
        "show_search": True,  # Search in applications and models names
        "command_search": True,  # Replace the sidebar search with the command search
        "show_all_applications": True,  # Dropdown with all applications and models
        "navigation": [
            {
                "title": _("Navigation"),
                "separator": True,  # Top border
                "collapsible": False,  # Collapsible group of links
                "items": [
                    {
                        "title": _("Dashboard"),
                        "icon": "dashboard",  # Supported icon set: https://fonts.google.com/icons
                        "link": reverse_lazy("admin:index"),
                        #"badge": "sample_app.badge_callback",
                        "permission": lambda request: request.user.is_superuser,
                    },
                    {
                        "title": _("Users"),
                        "icon": "people",
                        "link": reverse_lazy("admin:accounts_customuser_changelist"),
                    },
                    {
                        "title": _("Profiles"),
                        "icon": "data_object",
                        "link": reverse_lazy("admin:accounts_profile_changelist"),
                    },
                    {
                        "title": _("CourseWorks"),
                        "icon": "files",
                        "link": reverse_lazy("admin:core_coursework_changelist"),
                    },
                ],
            },
        ],
    },
    "STYLES": [
        lambda request: static("src/output.css"),
    ],
}