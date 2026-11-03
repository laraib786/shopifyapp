import {render} from 'preact';

// Opens the theme editor directly on the product template,
// where the "Stock Pulse" app block can be added.
const THEME_EDITOR_URL = 'shopify:admin/themes/current/editor?template=product';
const PRODUCTS_URL = 'shopify:admin/products';

export default async () => {
  render(<AppHome />, document.body);
};

function AppHome() {
  return (
    <s-page heading="Stock Pulse">
      <s-button slot="primary-action" variant="primary" href={THEME_EDITOR_URL}>
        Open theme editor
      </s-button>

      <s-banner tone="success" heading="Stock Pulse is installed">
        Add the Stock Pulse block to your product page to start showing live
        stock badges to your customers.
      </s-banner>

      <SetupSteps />
      <BadgeStates />
      <Customization />
      <Tips />

      <HelpAside />
    </s-page>
  );
}

function SetupSteps() {
  return (
    <s-section heading="Get started in 3 steps">
      <s-ordered-list>
        <s-list-item>
          <s-text type="strong">Open the theme editor.</s-text> Click{' '}
          <s-text type="strong">Open theme editor</s-text>. It opens your live
          theme on the product page template.
        </s-list-item>
        <s-list-item>
          <s-text type="strong">Add the block.</s-text> In the left sidebar,
          under <s-text type="strong">Product information</s-text>, click{' '}
          <s-text type="strong">Add block</s-text>, open the{' '}
          <s-text type="strong">Apps</s-text> tab and choose{' '}
          <s-text type="strong">Stock Pulse</s-text>.
        </s-list-item>
        <s-list-item>
          <s-text type="strong">Position and save.</s-text> Drag the block
          below the price or above the Add to cart button, then click{' '}
          <s-text type="strong">Save</s-text>.
        </s-list-item>
      </s-ordered-list>
      <s-stack direction="inline" gap="base" paddingBlockStart="base">
        <s-button variant="primary" href={THEME_EDITOR_URL}>
          Open theme editor
        </s-button>
        <s-button href={PRODUCTS_URL}>Manage product inventory</s-button>
      </s-stack>
    </s-section>
  );
}

function BadgeStates() {
  return (
    <s-section heading="What your customers will see">
      <s-paragraph>
        The badge updates automatically when a customer switches variants, so
        each size or color shows its own stock status.
      </s-paragraph>
      <s-table variant="auto">
        <s-table-header-row>
          <s-table-header listSlot="primary">Status</s-table-header>
          <s-table-header>When it shows</s-table-header>
          <s-table-header listSlot="secondary">Default message</s-table-header>
        </s-table-header-row>
        <s-table-body>
          <s-table-row>
            <s-table-cell>
              <s-badge tone="success">In stock</s-badge>
            </s-table-cell>
            <s-table-cell>The selected variant is available to buy</s-table-cell>
            <s-table-cell>In stock, ready to ship</s-table-cell>
          </s-table-row>
          <s-table-row>
            <s-table-cell>
              <s-badge tone="warning">Low stock</s-badge>
            </s-table-cell>
            <s-table-cell>
              Inventory is tracked and the quantity is at or below your
              threshold (5 by default)
            </s-table-cell>
            <s-table-cell>Hurry! Only [count] left in stock</s-table-cell>
          </s-table-row>
          <s-table-row>
            <s-table-cell>
              <s-badge tone="critical">Sold out</s-badge>
            </s-table-cell>
            <s-table-cell>The selected variant can't be purchased</s-table-cell>
            <s-table-cell>Out of stock</s-table-cell>
          </s-table-row>
        </s-table-body>
      </s-table>
    </s-section>
  );
}

function Customization() {
  return (
    <s-section heading="Customize the badge">
      <s-paragraph>
        Click the Stock Pulse block in the theme editor to change these
        settings. No code is needed.
      </s-paragraph>
      <s-unordered-list>
        <s-list-item>
          <s-text type="strong">Messages:</s-text> edit the in stock, low stock
          and sold out text. Use <s-text type="strong">[count]</s-text> in the
          low stock message to show the remaining quantity.
        </s-list-item>
        <s-list-item>
          <s-text type="strong">Low stock threshold:</s-text> choose the
          quantity (1–50) at which the low stock message appears.
        </s-list-item>
        <s-list-item>
          <s-text type="strong">Sold out badge:</s-text> show it, or hide the
          badge completely when a variant is sold out.
        </s-list-item>
        <s-list-item>
          <s-text type="strong">Style:</s-text> pick a color for each status,
          the dot size and the pulse speed.
        </s-list-item>
      </s-unordered-list>
    </s-section>
  );
}

function Tips() {
  return (
    <s-section heading="Good to know">
      <s-unordered-list>
        <s-list-item>
          The low stock message only appears for variants with{' '}
          <s-text type="strong">Track quantity</s-text> turned on. Untracked
          variants always show as in stock.
        </s-list-item>
        <s-list-item>
          If <s-text type="strong">Continue selling when out of stock</s-text>{' '}
          is on, the variant stays available and shows as in stock even at 0.
        </s-list-item>
        <s-list-item>
          Quantities are the total across all your locations, as of when the
          customer loaded the page.
        </s-list-item>
        <s-list-item>
          The block can only be added to product page templates.
        </s-list-item>
      </s-unordered-list>
    </s-section>
  );
}

function HelpAside() {
  return (
    <s-section slot="aside" heading="Need help?">
      <s-paragraph>
        Don't see Stock Pulse under the Apps tab? Make sure you are editing a{' '}
        <s-text type="strong">product</s-text> template, not the home page.
      </s-paragraph>
      <s-paragraph>
        Badge not updating when switching variants? Some custom themes change
        variants in a non-standard way. Check the theme's variant picker or
        contact the app developer.
      </s-paragraph>
      <s-paragraph>
        <s-link href="https://help.shopify.com/manual/online-store/themes/theme-structure/extend/apps#app-blocks" target="_blank">
          Learn about app blocks
        </s-link>
      </s-paragraph>
    </s-section>
  );
}
