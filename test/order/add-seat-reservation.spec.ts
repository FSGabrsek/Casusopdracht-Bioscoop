import IllegalStateException from "../../src/errors/illegal-state.exception";
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

test('should not throw a state exception when adding a reservation to an open order', () => {
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date(), 10);
    const ticket =  new MovieTicket(screening, false, 1, 1);
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new OpenState(order));
    
    expect(() => order.addSeatReservation(ticket)).not.toThrowError(IllegalStateException);
});

test('should not throw a state exception when adding a reservation to a saved order', () => {
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date(), 10);
    const ticket =  new MovieTicket(screening, false, 1, 1);
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new SavedState(order));
    
    expect(() => order.addSeatReservation(ticket)).not.toThrowError(IllegalStateException);
});

test('should throw a state exception when adding a reservation to a provisional order', () => {
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date(), 10);
    const ticket =  new MovieTicket(screening, false, 1, 1);
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new ProvisionalState(order));
    
    expect(() => order.addSeatReservation(ticket)).toThrowError(IllegalStateException);
});

test('should throw a state exception when adding a reservation to a processed order', () => {
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date(), 10);
    const ticket =  new MovieTicket(screening, false, 1, 1);
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    order.state = (new ProcessedState(order));
    
    expect(() => order.addSeatReservation(ticket)).toThrowError(IllegalStateException);
});