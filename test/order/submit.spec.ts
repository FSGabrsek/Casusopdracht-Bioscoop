import IllegalStateException from "../../src/errors/illegal-state.exception";
import AlertManager from "../../src/models/alert/alert-manager.model";
import EmailService from "../../src/models/alert/services/email.service";
import SmsService from "../../src/models/alert/services/sms.service";
import WhatsappService from "../../src/models/alert/services/whatsapp.service";
import { MovieScreening } from "../../src/models/movie-screening.model";
import { MovieTicket } from "../../src/models/movie-ticket.model";
import { Movie } from "../../src/models/movie.model";
import { Order } from "../../src/models/order/order.model";
import { OpenState } from "../../src/models/order/states/open.state";
import { ProcessedState } from "../../src/models/order/states/processed.state";
import { ProvisionalState } from "../../src/models/order/states/provisional.state";
import { SavedState } from "../../src/models/order/states/saved.state";
import { PlainTextExportStrategy } from "../../src/models/order/strategies/plaintext-export.strategy";
import { StandardPriceStrategy } from "../../src/models/order/strategies/standard-price.strategy";

test('should not throw a state exception when submiting an open order', () => {
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new OpenState(order));

    expect(() => order.submit()).not.toThrowError(IllegalStateException);
});

test('should not throw an error when submiting an open order with reservations', () => {
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date(), 10);
    const ticket =  new MovieTicket(screening, false, 1, 1);
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new OpenState(order));
    order.addSeatReservation(ticket);
    
    expect(() => order.submit()).not.toThrowError('cannot submit an order with no reservations');
});

test('should throw an error when submiting an open order with no reservations', () => {
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new OpenState(order));

    expect(() => order.submit()).toThrowError('cannot submit an order with no reservations');
});

test('should send an sms when submitting an order with an sms alert', () => { 
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date(), 10);
    const ticket =  new MovieTicket(screening, false, 1, 1);
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    const service = new SmsService();
    const manager = new AlertManager(service);
    const sendMessageSpy = jest.spyOn(service, 'sendMessage');
    order.state = (new OpenState(order));
    order.addSeatReservation(ticket);
    order.subscribe(manager);

    order.submit();

    expect(sendMessageSpy).toBeCalled();
});

test('should send an email when submitting an order with an email alert', () => { 
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date(), 10);
    const ticket =  new MovieTicket(screening, false, 1, 1);
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    const service = new EmailService();
    const manager = new AlertManager(service);
    const sendMessageSpy = jest.spyOn(service, 'sendMessage');
    order.state = (new OpenState(order));
    order.addSeatReservation(ticket);
    order.subscribe(manager);

    order.submit();

    expect(sendMessageSpy).toBeCalled();
});

test('should send a whatsapp message when submitting an order with a whatsapp alert', () => { 
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date(), 10);
    const ticket =  new MovieTicket(screening, false, 1, 1);
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    const service = new WhatsappService();
    const manager = new AlertManager(service);
    const sendMessageSpy = jest.spyOn(service, 'sendMessage');
    order.state = (new OpenState(order));
    order.addSeatReservation(ticket);
    order.subscribe(manager);

    order.submit();

    expect(sendMessageSpy).toBeCalled();
});

test('should throw a state exception when submiting a saved order', () => {
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new SavedState(order));

    expect(() => order.submit()).toThrowError(IllegalStateException);
});

test('should throw a state exception when submiting a provisonal order', () => {
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new ProvisionalState(order));

    expect(() => order.submit()).toThrowError(IllegalStateException);
});

test('should throw a state exception when submiting a processed order', () => {
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new ProcessedState(order));

    expect(() => order.submit()).toThrowError(IllegalStateException);
});