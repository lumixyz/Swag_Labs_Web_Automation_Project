import {test as base} from "../../e2e/fixtures/base.fixture";
import AxeBuilder from '@axe-core/playwright'; 


type AxeFixture = {
  makeAxeBuilder: () => AxeBuilder;
};

export const test = base.extend<AxeFixture>({
    makeAxeBuilder: async ({ page }, use, testInfo) => {
      const makeAxeBuilder = () => new AxeBuilder({ page })
        //   .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        //   .exclude('#commonly-reused-element-with-known-issue');
  
      await use(makeAxeBuilder);
    },
  });
  export { expect } from "../../e2e/fixtures/base.fixture";