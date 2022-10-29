import * as fs from "fs";
import {Empty, JSONCodec, NatsError, StringCodec} from "nats";
import * as NATS from 'nats'
import * as path from "path";

async function start() {
    const nc = await NATS.connect({
        servers: `nats://radar.gleb.pw:4222`,
        token: 'ask me t.me/glebpw',
    })

    const pulses = nc.subscribe("flow.pulses");
    const daily = nc.subscribe("flow.daily");
    const quotes = nc.subscribe("flow.quotes");
    const markets = nc.subscribe("flow.markets");

    async function printMsgs(s) {
        let subj = s.getSubject();
        console.log(`listening for ${subj}`);
        const c = (13 - subj.length);
        const pad = "".padEnd(c);
        for await (const m of s) {
            fs.writeFileSync(path.resolve("flow_files",subj+".json"), m.data)
            console.log(
                `[${subj}]${pad} #${s.getProcessed()} - ${m.subject} - ${m.data?.length}`,
            );
        }
    }

    printMsgs(pulses);
    printMsgs(daily);
    printMsgs(quotes);
    printMsgs(markets);

}

start()
