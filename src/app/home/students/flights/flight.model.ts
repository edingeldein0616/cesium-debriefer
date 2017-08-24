export class Flight {
    
    constructor(
        public airfield: string,
        public date: string,
        public length?: string,
        public flightId?: string,
        public studentId?: string,
        public instructorId?: string,
        public studentName?: string,
        public instructorName?: string
    ) {}
}