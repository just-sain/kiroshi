import { AuthService } from './auth.service'
import { PageService } from './page.service'

// exporting services
export const services = {
	auth: new AuthService(),
	page: new PageService(),
}
