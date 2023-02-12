import IllegalStateException from "../../src/errors/illegal-state.exception";
import { Order } from "../../src/models/order/order.model";
import { OpenState } from "../../src/models/order/states/open.state";
import { ProcessedState } from "../../src/models/order/states/processed.state";
import { ProvisionalState } from "../../src/models/order/states/provisional.state";
import { SavedState } from "../../src/models/order/states/saved.state";
import { PlainTextExportStrategy } from "../../src/models/order/strategies/plaintext-export.strategy";
import { StandardPriceStrategy } from "../../src/models/order/strategies/standard-price.strategy";

test('should not throw a state exception when cancelling an open order', () => {
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new OpenState(order));

    expect(() => order.cancel()).not.toThrowError(IllegalStateException);
});

test('should not throw a state exception when cancelling a saved order', () => {
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new SavedState(order));

    expect(() => order.cancel()).not.toThrowError(IllegalStateException);
});

test('should not throw a state exception when cancelling a provisonal order', () => {
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new ProvisionalState(order));

    expect(() => order.cancel()).not.toThrowError(IllegalStateException);
});

test('should throw a state exception when cancelling a processed order', () => {
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new ProcessedState(order));

    expect(() => order.cancel()).toThrowError(IllegalStateException);
});