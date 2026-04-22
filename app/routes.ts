import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("work", "routes/work.tsx"),
  route("work/digital", "routes/work.digital.tsx"),
  route("work/drawings", "routes/work.drawings.tsx"),
  route("work/mixed-media", "routes/work.mixed-media.tsx"),
  route("work/paintings", "routes/work.paintings.tsx"),
] satisfies RouteConfig;
