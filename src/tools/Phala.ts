import {ApiPromise} from "@polkadot/api";
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';
import {Keyring} from "@polkadot/keyring";

export class Phala {
    private api: Promise<ApiPromise>;

    constructor(api: Promise<ApiPromise>) {
        this.api = api;
    }

    async getPhalaComputationWorkerBindings(SpCoreSr25519Public: string): Promise<string> {
        return await this.api.then(async (api): Promise<string | any> => {
            return (await api.query.phalaComputation.workerBindings(SpCoreSr25519Public)).toJSON()
        })
    }

    async getPhalaComputationSessions(AccountId32: string): Promise<{ totalReward: number; state: any } | JSON> {
        return await this.api.then(async (api): Promise<{ totalReward: number; state: any }> => {
            console.log(AccountId32)
            const sessions: any = (await api.query.phalaComputation.sessions(AccountId32)).toJSON()
            console.log(sessions)
            return sessions
        })
    }

    createAddress(): {address: string, mnemonic: string} {
        const mnemonic = mnemonicGenerate();
        const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
        const newPair = keyring.addFromUri(mnemonic);
        keyring.setSS58Format(30)

        return {
            address: newPair.address,
            mnemonic: mnemonic
        }
    }

    async getBalance(address: string): Promise<{Balance: number}> {
        return await this.api.then(async (api): Promise<{ Balance: number}> => {
            const sessions: any = (await api.query.system.account(address)).toJSON()
            return {
                Balance: sessions.data.free / 1000000000000
            }
        })
    }
}
