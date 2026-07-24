# FrameUI templates

The template previews in the FrameUI docs come from two independent Angular applications:

- [`store/`](./store): catalog, inventory, orders, suppliers, and daily operations
- [`administration/`](./administration): users, roles, audit history, and settings

Each folder is a self-contained project with its own dependencies, routes, build configuration, and
README. Download only the application that matches the work you are building.

`templates.routes.ts` is the small integration layer used by the FrameUI docs. It lazy-loads the two
projects without coupling their standalone builds.
