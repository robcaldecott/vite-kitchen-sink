import "@testing-library/jest-dom";
import "whatwg-fetch";
import { setProjectAnnotations } from "@storybook/testing-react";
import { getWorker } from "msw-storybook-addon";
import { configure } from "@testing-library/react";
import * as globalStorybookConfig from "../.storybook/preview";

Object.defineProperty(window, "scrollTo", { value: () => {}, writable: true });
setProjectAnnotations(globalStorybookConfig);
configure({ asyncUtilTimeout: 5000 });

// @ts-ignore
afterAll(() => getWorker().close());
