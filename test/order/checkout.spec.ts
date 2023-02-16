import IllegalStateException from "../../src/errors/illegal-state.exception";
import AlertManager from "../../src/models/alert/alert-manager.model";
import EmailService from "../../src/models/alert/services/email.service";
import SmsService from "../../src/models/alert/services/sms.service";
import WhatsappService from "../../src/models/alert/services/whatsapp.service";
import { Order } from "../../src/models/order/order.model";
import { OpenState } from "../../src/models/order/states/open.state";
import { ProcessedState } from "../../src/models/order/states/processed.state";
import { ProvisionalState } from "../../src/models/order/states/provisional.state";
import { SavedState } from "../../src/models/order/states/saved.state";
import { PlainTextExportStrategy } from "../../src/models/order/strategies/plaintext-export.strategy";
import { StandardPriceStrategy } from "../../src/models/order/strategies/standard-price.strategy";

test('should throw a state exception when paying for an open order', () => {
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new OpenState(order));

    expect(() => order.checkout()).toThrowError(IllegalStateException);
});

test('should not throw a state exception when paying for a saved order', () => {
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new SavedState(order));

    expect(() => order.checkout()).not.toThrowError(IllegalStateException);
});

test('should send an sms when paying for a saved order with an sms alert', () => { 
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    const service = new SmsService();
    const manager = new AlertManager(service);
    const sendMessageSpy = jest.spyOn(service, 'sendMessage');
    order.state = (new SavedState(order));
    order.subscribe(manager);

    order.checkout();

    expect(sendMessageSpy).toBeCalled();
});

test('should send an email when paying for a saved order with an email alert', () => { 
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    const service = new EmailService();
    const manager = new AlertManager(service);
    const sendMessageSpy = jest.spyOn(service, 'sendMessage');
    order.state = (new SavedState(order));
    order.subscribe(manager);

    order.checkout();

    expect(sendMessageSpy).toBeCalled();
});

test('should send a whatsapp message when paying for a saved order with a whatsapp alert', () => { 
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    const service = new WhatsappService();
    const manager = new AlertManager(service);
    const sendMessageSpy = jest.spyOn(service, 'sendMessage');
    order.state = (new SavedState(order));
    order.subscribe(manager);

    order.checkout();

    expect(sendMessageSpy).toBeCalled();
});

test('should not throw a state exception when paying for a provisonal order', () => {
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new ProvisionalState(order));

    expect(() => order.checkout()).not.toThrowError(IllegalStateException);
});

test('should send an sms when paying for a provisional order with an sms alert', () => { 
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    const service = new SmsService();
    const manager = new AlertManager(service);
    const sendMessageSpy = jest.spyOn(service, 'sendMessage');
    order.state = (new ProvisionalState(order));
    order.subscribe(manager);

    order.checkout();

    expect(sendMessageSpy).toBeCalled();
});

test('should send an email when paying for a provisional order with an email alert', () => { 
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    const service = new EmailService();
    const manager = new AlertManager(service);
    const sendMessageSpy = jest.spyOn(service, 'sendMessage');
    order.state = (new ProvisionalState(order));
    order.subscribe(manager);

    order.checkout();

    expect(sendMessageSpy).toBeCalled();
});

test('should send a whatsapp message when paying for a provisional order with a whatsapp alert', () => { 
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    const service = new WhatsappService();
    const manager = new AlertManager(service);
    const sendMessageSpy = jest.spyOn(service, 'sendMessage');
    order.state = (new ProvisionalState(order));
    order.subscribe(manager);

    order.checkout();

    expect(sendMessageSpy).toBeCalled();
});

test('should throw a state exception when paying for a processed order', () => {
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new ProcessedState(order));

    expect(() => order.checkout()).toThrowError(IllegalStateException);
});