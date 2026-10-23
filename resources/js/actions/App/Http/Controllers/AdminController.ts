import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminController::getDashboard
* @see app/Http/Controllers/AdminController.php:13
* @route '/api/admin/dashboard'
*/
export const getDashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDashboard.url(options),
    method: 'get',
})

getDashboard.definition = {
    methods: ["get","head"],
    url: '/api/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::getDashboard
* @see app/Http/Controllers/AdminController.php:13
* @route '/api/admin/dashboard'
*/
getDashboard.url = (options?: RouteQueryOptions) => {
    return getDashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::getDashboard
* @see app/Http/Controllers/AdminController.php:13
* @route '/api/admin/dashboard'
*/
getDashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::getDashboard
* @see app/Http/Controllers/AdminController.php:13
* @route '/api/admin/dashboard'
*/
getDashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDashboard.url(options),
    method: 'head',
})

const AdminController = { getDashboard }

export default AdminController