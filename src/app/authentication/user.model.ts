import { Flight } from '../home/students/flights/flight.model';

export class User {
    
    public username: string;
    public password: string;
    public firstname: string;
    public lastname: string;
    private userId: string;
    private permission: string;
    public flights: Flight[] = [];

    
    constructor(username: string, password: string, userId?: string, permission?: string, firstname?: string, lastname?: string) {
        this.username = username;
        this.password = password;
        this.userId = userId;
        this.permission = permission;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    setPermission(permission: string) {
        this.permission = permission;
    }

    getPermission() : string {
        return this.permission;
    }

    getId() : string {
        return this.userId;
    }

    addFlight(flight: Flight) {
        this.flights.push(flight);
    }

    clearFlights() {
        this.flights = [];
    }
}