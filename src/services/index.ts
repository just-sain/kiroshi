import { AuthService } from './auth.service'
import { AwardsService } from './awards.service'
import { ModelService } from './model.service'
import { PageService } from './page.service'
import { PortfolioService } from './portfolio.service'

// exporting services
export const services = {
	auth: new AuthService(),
	page: new PageService(),
	model: new ModelService(),
	portfolio: new PortfolioService(),
	award: new AwardsService(),
}
