import { Injectable } from '@nestjs/common';
// import createClient from 'xen-api'; // 실제 패키지의 이름으로 변경해야 합니다.
import { createClient } from 'xen-api';


@Injectable()
export class SmcInstanceService {
	private xenConnection: any;

	constructor() {
    // Xen 연결 설정 등을 수행
    this.xenConnection = createClient({
			url: 'http://121.162.93.254',
			allowUnauthorized: false,
			auth: {
				user: 'root', 
				password: 'rlawoals2590',
			}});
  }

	async getVirtualMachines() {
    this.xenConnection.connect().catch(error => {
			console.error(error)
		})
	}
}
