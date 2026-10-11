# Constellation

A local, dependency-free 3D project graph. Includes an editable sample with 12 issues, 3 features, and 13 directed dependencies.

## Open locally

Double-click `Launch.command` on macOS (requires Python 3), then visit http://127.0.0.1:4173. Keep its terminal open while using the dashboard. If the address is already serving Constellation, use that instance.

Alternatively, from this folder:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

The site consists of static HTML, CSS, and JavaScript. No install, build, account, external font, CDN, or online service is needed. `dist/index.html` can also be opened directly, though browser saving behavior on file URLs varies.

## Work with the graph

- Drag the background to orbit around all three-dimensional coordinates. Scroll or use + / − to zoom. Fit view recenters the graph.
- Drag an issue to move it in the camera plane. Hold Shift while dragging to move along the camera's depth axis. Group dragging moves its contained issues together.
- Select a node or an explorer entry to inspect it. Selecting a contained issue expands the graph if needed.
- Use New issue to add work. Use the + beside Features & issues to create a feature/category. Edit an issue to change feature membership, status, description, and dependencies. Use Command/Ctrl in the dependencies list to select multiple dependencies or clear one.
- Grouped folds issues into larger feature nodes. Architecture opens this aggregate view. Arrows point toward dependencies; labels count the underlying cross-feature issue relationships.
- Expand/collapse each nested list with its chevron. Search matches titles, IDs, and feature names.
- Focus the graph and use arrow keys to orbit or + / − to zoom. The explorer and inspector provide keyboard-accessible selection and editing.

## Data

Changes and 3D positions save in this browser's local storage, scoped to its URL. Reloading preserves project data. Camera/view preferences reset when reloaded. Export downloads the complete graph as JSON. Browser storage clearing removes the saved graph; retain an export for a backup. The included demo is not connected to an issue tracker.

JSON contains `groups`, `nodes`, and `edges`. Each group has `id`, `name`, `description`, `color`, and numeric `x/y/z`. Each issue has `id`, `title`, `description`, `status`, `group`, and `x/y/z`. Each edge is `[dependentIssueId, dependencyIssueId]`. Membership is one feature per issue; hierarchy is feature → issues. Architecture is a view of these same groups and relationships.

Supported browsers may discover two WebMCP tools: `read_project_graph` and `set_graph_view`. These use the same data and view actions as the interface.

## Validation

Checked JavaScript syntax, local HTTP responses, desktop and narrow layouts, issue status and feature reassignment, multi-dependency retention, reload persistence, grouped dragging (including child movement), orbit controls, and architecture view changes. WebMCP valid view selection and invalid-mode rejection were exercised in the browser.

## Branch timeline view

Choose **Layout → Branch timeline** for horizontal, color-coded issue lanes inspired by the Linux distribution family tree. A feature forms a band of lanes; dependency lines branch from prerequisites on the left into dependent issues farther right. Select any lane to use the existing inspector and editor. Expanded and Grouped, issue and architecture modes, and search all work in this layout.

Columns are **dependency stages**, not calendar dates: the project has no issue dates. Circular dependencies share a stage and receive a ↻ marker with dashed connecting lines. Filtering preserves each issue's original stage. In Grouped mode, stages are recalculated for the feature-level graph.

Scroll or drag the background to pan, use + / − to zoom, and Fit view to fit the width. The 3D positions are preserved when switching layouts. Keyboard users can tab to lanes and select with Enter or Space. The `set_graph_view` tool also accepts `layout: "timeline"` or `layout: "3d"`.
