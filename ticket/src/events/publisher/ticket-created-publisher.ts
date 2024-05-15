import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "../../../common/src/index";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
