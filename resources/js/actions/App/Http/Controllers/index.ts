import AuthController from './AuthController'
import ProgressController from './ProgressController'
import MaterialController from './MaterialController'
import AdminController from './AdminController'
import Settings from './Settings'

const Controllers = {
    AuthController: Object.assign(AuthController, AuthController),
    ProgressController: Object.assign(ProgressController, ProgressController),
    MaterialController: Object.assign(MaterialController, MaterialController),
    AdminController: Object.assign(AdminController, AdminController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers