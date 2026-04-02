// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"cli-usage.mdx": () => import("../content/docs/cli-usage.mdx?collection=docs"), "comparison.mdx": () => import("../content/docs/comparison.mdx?collection=docs"), "deployment.mdx": () => import("../content/docs/deployment.mdx?collection=docs"), "getting-started.mdx": () => import("../content/docs/getting-started.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "installation.mdx": () => import("../content/docs/installation.mdx?collection=docs"), "features/animations.mdx": () => import("../content/docs/features/animations.mdx?collection=docs"), "features/backend.mdx": () => import("../content/docs/features/backend.mdx?collection=docs"), "features/ci-cd.mdx": () => import("../content/docs/features/ci-cd.mdx?collection=docs"), "features/code-quality.mdx": () => import("../content/docs/features/code-quality.mdx?collection=docs"), "features/index.mdx": () => import("../content/docs/features/index.mdx?collection=docs"), "features/multi-app.mdx": () => import("../content/docs/features/multi-app.mdx?collection=docs"), "features/shadcn.mdx": () => import("../content/docs/features/shadcn.mdx?collection=docs"), }),
};
export default browserCollections;