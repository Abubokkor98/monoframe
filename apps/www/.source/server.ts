// @ts-nocheck
import { default as __fd_glob_14 } from "../content/docs/features/meta.json?collection=meta"
import { default as __fd_glob_13 } from "../content/docs/meta.json?collection=meta"
import * as __fd_glob_12 from "../content/docs/features/shadcn.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/features/multi-app.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/features/index.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/features/code-quality.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/features/ci-cd.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/features/backend.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/features/animations.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/installation.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/getting-started.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/deployment.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/comparison.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/cli-usage.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.doc("docs", "content/docs", {"cli-usage.mdx": __fd_glob_0, "comparison.mdx": __fd_glob_1, "deployment.mdx": __fd_glob_2, "getting-started.mdx": __fd_glob_3, "index.mdx": __fd_glob_4, "installation.mdx": __fd_glob_5, "features/animations.mdx": __fd_glob_6, "features/backend.mdx": __fd_glob_7, "features/ci-cd.mdx": __fd_glob_8, "features/code-quality.mdx": __fd_glob_9, "features/index.mdx": __fd_glob_10, "features/multi-app.mdx": __fd_glob_11, "features/shadcn.mdx": __fd_glob_12, });

export const meta = await create.meta("meta", "content/docs", {"meta.json": __fd_glob_13, "features/meta.json": __fd_glob_14, });