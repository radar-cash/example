import * as fs from "fs";
import {Empty, JSONCodec, NatsError, StringCodec} from "nats";
import * as NATS from 'nats'
import * as path from "path";

async function start() {
    const nc = await NATS.connect({
        servers: `nats://radar.gleb.pw:4222`,
        token: 'ask me t.me/glebpw',
    })

    // текущие данные, обновляется часто
    const pulses = nc.subscribe("flow.pulses");

    // коофиценты, обновляется раз в минуту
    const daily = nc.subscribe("flow.daily");

    // инфа по койнам (название и прочее), обновляется раз/два в сутки
    // const quotes = nc.subscribe("flow.quotes");

    // инфа кто где торгуется, обновляется с фиксированной скоростью проходя по всем койнам,
    // полный цикл от несольких дней
    // const markets = nc.subscribe("flow.markets");

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

}

start()
