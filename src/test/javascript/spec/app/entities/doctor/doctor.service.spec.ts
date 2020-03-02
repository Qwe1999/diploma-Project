// import { TestBed, getTestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import * as moment from 'moment';
// import { DATE_FORMAT } from 'app/shared/constants/input.constants';
// import { DoctorService } from 'app/entities/doctor/doctor.service';
// import { IDoctor, Doctor } from 'app/shared/model/doctor.model';
// import { Day } from 'app/shared/model/enumerations/day.model';
//
// describe('Service Tests', () => {
//   describe('Doctor Service', () => {
//     let injector: TestBed;
//     let service: DoctorService;
//     let httpMock: HttpTestingController;
//     let elemDefault: IDoctor;
//     let expectedResult: IDoctor | IDoctor[] | boolean | null;
//     let currentDate: moment.Moment;
//
//     beforeEach(() => {
//       TestBed.configureTestingModule({
//         imports: [HttpClientTestingModule]
//       });
//       expectedResult = null;
//       injector = getTestBed();
//       service = injector.get(DoctorService);
//       httpMock = injector.get(HttpTestingController);
//       currentDate = moment();
//
//       elemDefault = new Doctor(0, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate, Day.MONDAY);
//     });
//
//     describe('Service methods', () => {
//       it('should find an element', () => {
//         const returnedFromService = Object.assign(
//           {
//             workingHourBegin: currentDate.format(DATE_FORMAT),
//             workingHourEnd: currentDate.format(DATE_FORMAT)
//           },
//           elemDefault
//         );
//
//         service.find(123).subscribe(resp => (expectedResult = resp.body));
//
//         const req = httpMock.expectOne({ method: 'GET' });
//         req.flush(returnedFromService);
//         expect(expectedResult).toMatchObject(elemDefault);
//       });
//
//       it('should create a Doctor', () => {
//         const returnedFromService = Object.assign(
//           {
//             id: 0,
//             workingHourBegin: currentDate.format(DATE_FORMAT),
//             workingHourEnd: currentDate.format(DATE_FORMAT)
//           },
//           elemDefault
//         );
//
//         const expected = Object.assign(
//           {
//             workingHourBegin: currentDate,
//             workingHourEnd: currentDate
//           },
//           returnedFromService
//         );
//
//         service.create(new Doctor()).subscribe(resp => (expectedResult = resp.body));
//
//         const req = httpMock.expectOne({ method: 'POST' });
//         req.flush(returnedFromService);
//         expect(expectedResult).toMatchObject(expected);
//       });
//
//       it('should update a Doctor', () => {
//         const returnedFromService = Object.assign(
//           {
//             position: 'BBBBBB',
//             room: 'BBBBBB',
//             workingHourBegin: currentDate.format(DATE_FORMAT),
//             workingHourEnd: currentDate.format(DATE_FORMAT),
//             daysWork: 'BBBBBB'
//           },
//           elemDefault
//         );
//
//         const expected = Object.assign(
//           {
//             workingHourBegin: currentDate,
//             workingHourEnd: currentDate
//           },
//           returnedFromService
//         );
//
//         service.update(expected).subscribe(resp => (expectedResult = resp.body));
//
//         const req = httpMock.expectOne({ method: 'PUT' });
//         req.flush(returnedFromService);
//         expect(expectedResult).toMatchObject(expected);
//       });
//
//       it('should return a list of Doctor', () => {
//         const returnedFromService = Object.assign(
//           {
//             position: 'BBBBBB',
//             room: 'BBBBBB',
//             workingHourBegin: currentDate.format(DATE_FORMAT),
//             workingHourEnd: currentDate.format(DATE_FORMAT),
//             daysWork: 'BBBBBB'
//           },
//           elemDefault
//         );
//
//         const expected = Object.assign(
//           {
//             workingHourBegin: currentDate,
//             workingHourEnd: currentDate
//           },
//           returnedFromService
//         );
//
//         service.query().subscribe(resp => (expectedResult = resp.body));
//
//         const req = httpMock.expectOne({ method: 'GET' });
//         req.flush([returnedFromService]);
//         httpMock.verify();
//         expect(expectedResult).toContainEqual(expected);
//       });
//
//       it('should delete a Doctor', () => {
//         service.delete(123).subscribe(resp => (expectedResult = resp.ok));
//
//         const req = httpMock.expectOne({ method: 'DELETE' });
//         req.flush({ status: 200 });
//         expect(expectedResult);
//       });
//     });
//
//     afterEach(() => {
//       httpMock.verify();
//     });
//   });
// });
