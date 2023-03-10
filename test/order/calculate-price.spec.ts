import { MovieScreening } from "../../src/models/movie-screening.model";
import { MovieTicket } from "../../src/models/movie-ticket.model";
import { Movie } from "../../src/models/movie.model";
import { Order } from "../../src/models/order/order.model";
import { PlainTextExportStrategy } from "../../src/models/order/strategies/plaintext-export.strategy";
import { StandardPriceStrategy } from "../../src/models/order/strategies/standard-price.strategy";
import { StudentPriceStrategy } from "../../src/models/order/strategies/student-price.strategy";

test('calculates price for 2 non-premium tickets in standard orders on sundays', () => { 
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date('2023-02-05T18:00:00'), 10);
    const tickets = [
        new MovieTicket(screening, false, 1, 1),
        new MovieTicket(screening, false, 1, 2),
    ];
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    tickets.forEach(reservation => order.addSeatReservation(reservation));

    const price = order.calculatePrice();
    const expectedPrice = 20;

    expect(price).toBe(expectedPrice);
});

test('calculates price for 2 premium tickets in standard orders on sundays', () => { 
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date('2023-02-05T18:00:00'), 10);
    const tickets = [
        new MovieTicket(screening, true, 1, 1),
        new MovieTicket(screening, true, 1, 2),
    ];
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    tickets.forEach(reservation => order.addSeatReservation(reservation));

    const price = order.calculatePrice();
    const expectedPrice = 26;

    expect(price).toBe(expectedPrice);
});

test('calculates price for 2 non premium tickets in standard orders on mondays', () => { 
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date('2023-02-06T18:00:00'), 10);
    const tickets = [
        new MovieTicket(screening, false, 1, 1),
        new MovieTicket(screening, false, 1, 2),
    ];
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    tickets.forEach(reservation => order.addSeatReservation(reservation));

    const price = order.calculatePrice();
    const expectedPrice = 10;

    expect(price).toBe(expectedPrice);
});

test('calculates price for 2 premium tickets in standard orders on mondays', () => { 
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date('2023-02-06T18:00:00'), 10);
    const tickets = [
        new MovieTicket(screening, true, 1, 1),
        new MovieTicket(screening, true, 1, 2),
    ];
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    tickets.forEach(reservation => order.addSeatReservation(reservation));

    const price = order.calculatePrice();
    const expectedPrice = 13;

    expect(price).toBe(expectedPrice);
});

test('calculates price for 2 non-premium tickets in student orders on sundays', () => { 
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date('2023-02-05T18:00:00'), 10);
    const tickets = [
        new MovieTicket(screening, false, 1, 1),
        new MovieTicket(screening, false, 1, 2),
    ];
    const order = new Order(1, new StudentPriceStrategy(), new PlainTextExportStrategy());
    tickets.forEach(reservation => order.addSeatReservation(reservation));

    const price = order.calculatePrice();
    const expectedPrice = 10;

    expect(price).toBe(expectedPrice);
});

test('calculates price for 2 premium tickets in student orders on sundays', () => { 
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date('2023-02-05T18:00:00'), 10);
    const tickets = [
        new MovieTicket(screening, true, 1, 1),
        new MovieTicket(screening, true, 1, 2),
    ];
    const order = new Order(1, new StudentPriceStrategy(), new PlainTextExportStrategy());
    tickets.forEach(reservation => order.addSeatReservation(reservation));

    const price = order.calculatePrice();
    const expectedPrice = 12;

    expect(price).toBe(expectedPrice);
});

test('calculates price for 6 non-premium tickets in standard orders on sundays', () => { 
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date('2023-02-05T18:00:00'), 10);
    const tickets = [
        new MovieTicket(screening, false, 1, 1),
        new MovieTicket(screening, false, 1, 2),
        new MovieTicket(screening, false, 1, 3),
        new MovieTicket(screening, false, 1, 4),
        new MovieTicket(screening, false, 1, 5),
        new MovieTicket(screening, false, 1, 6),
    ];
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    tickets.forEach(reservation => order.addSeatReservation(reservation));

    const price = order.calculatePrice();
    const expectedPrice = 54;

    expect(price).toBe(expectedPrice);
});

test('calculates price for 6 premium tickets in standard orders on sundays', () => { 
    const movie = new Movie('movie title');
    const screening = new MovieScreening(movie, new Date('2023-02-05T18:00:00'), 10);
    const tickets = [
        new MovieTicket(screening, true, 1, 1),
        new MovieTicket(screening, true, 1, 2),
        new MovieTicket(screening, true, 1, 3),
        new MovieTicket(screening, true, 1, 4),
        new MovieTicket(screening, true, 1, 5),
        new MovieTicket(screening, true, 1, 6),
    ];
    const order = new Order(1, new StandardPriceStrategy(), new PlainTextExportStrategy());
    tickets.forEach(reservation => order.addSeatReservation(reservation));

    const price = order.calculatePrice();
    const expectedPrice = 70.20;

    expect(price).toBe(expectedPrice);
});