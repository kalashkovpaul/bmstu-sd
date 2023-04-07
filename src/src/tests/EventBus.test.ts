import EventBus from "@/modules/Bus/EventBus";
jest.deepUnmock("@/modules/Bus/EventBus");


const bus = new EventBus();
describe("EventBus test", () => {
    it('on test', () => {
        const f = jest.fn();
        bus.on("test1", f);
        bus.emit("test1");
        expect(f).toBeCalled();
    });

    it('call with arguments', () => {
        const f = jest.fn();
        bus.on("test2", f);
        bus.emit("test2", 4);
        expect(f).toBeCalledWith(4);
    });

    it('call without arguments', () => {
        const f = jest.fn();
        bus.on("test3", f);
        bus.emit("test3");
        expect(f).toBeCalledWith();
    });

    it('off test', () => {
        const f = jest.fn();
        bus.on("test4", f);
        bus.emit("test4");
        bus.off("test4", f);
        bus.emit("test4");
        expect(f).toBeCalledTimes(1);
    });

    it('multiple events', () => {
        const events = ["1", "2", "3", "4"];
        const f = jest.fn();
        events.forEach(event => {
            bus.on(event, f);
        });
        events.forEach(event => {
            bus.emit(event);
        });
        expect(f).toBeCalledTimes(events.length);
    });
});