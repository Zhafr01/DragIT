import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MaterialController::getMaterials
* @see app/Http/Controllers/MaterialController.php:10
* @route '/api/materials'
*/
export const getMaterials = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMaterials.url(options),
    method: 'get',
})

getMaterials.definition = {
    methods: ["get","head"],
    url: '/api/materials',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaterialController::getMaterials
* @see app/Http/Controllers/MaterialController.php:10
* @route '/api/materials'
*/
getMaterials.url = (options?: RouteQueryOptions) => {
    return getMaterials.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaterialController::getMaterials
* @see app/Http/Controllers/MaterialController.php:10
* @route '/api/materials'
*/
getMaterials.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMaterials.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MaterialController::getMaterials
* @see app/Http/Controllers/MaterialController.php:10
* @route '/api/materials'
*/
getMaterials.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getMaterials.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MaterialController::getEvaluations
* @see app/Http/Controllers/MaterialController.php:18
* @route '/api/evaluations'
*/
export const getEvaluations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getEvaluations.url(options),
    method: 'get',
})

getEvaluations.definition = {
    methods: ["get","head"],
    url: '/api/evaluations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaterialController::getEvaluations
* @see app/Http/Controllers/MaterialController.php:18
* @route '/api/evaluations'
*/
getEvaluations.url = (options?: RouteQueryOptions) => {
    return getEvaluations.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaterialController::getEvaluations
* @see app/Http/Controllers/MaterialController.php:18
* @route '/api/evaluations'
*/
getEvaluations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getEvaluations.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MaterialController::getEvaluations
* @see app/Http/Controllers/MaterialController.php:18
* @route '/api/evaluations'
*/
getEvaluations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getEvaluations.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MaterialController::getQuestions
* @see app/Http/Controllers/MaterialController.php:26
* @route '/api/questions'
*/
export const getQuestions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getQuestions.url(options),
    method: 'get',
})

getQuestions.definition = {
    methods: ["get","head"],
    url: '/api/questions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaterialController::getQuestions
* @see app/Http/Controllers/MaterialController.php:26
* @route '/api/questions'
*/
getQuestions.url = (options?: RouteQueryOptions) => {
    return getQuestions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaterialController::getQuestions
* @see app/Http/Controllers/MaterialController.php:26
* @route '/api/questions'
*/
getQuestions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getQuestions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MaterialController::getQuestions
* @see app/Http/Controllers/MaterialController.php:26
* @route '/api/questions'
*/
getQuestions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getQuestions.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MaterialController::updateMaterials
* @see app/Http/Controllers/MaterialController.php:34
* @route '/api/admin/materials'
*/
export const updateMaterials = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateMaterials.url(options),
    method: 'post',
})

updateMaterials.definition = {
    methods: ["post"],
    url: '/api/admin/materials',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MaterialController::updateMaterials
* @see app/Http/Controllers/MaterialController.php:34
* @route '/api/admin/materials'
*/
updateMaterials.url = (options?: RouteQueryOptions) => {
    return updateMaterials.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaterialController::updateMaterials
* @see app/Http/Controllers/MaterialController.php:34
* @route '/api/admin/materials'
*/
updateMaterials.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateMaterials.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MaterialController::updateEvaluations
* @see app/Http/Controllers/MaterialController.php:50
* @route '/api/admin/evaluations'
*/
export const updateEvaluations = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateEvaluations.url(options),
    method: 'post',
})

updateEvaluations.definition = {
    methods: ["post"],
    url: '/api/admin/evaluations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MaterialController::updateEvaluations
* @see app/Http/Controllers/MaterialController.php:50
* @route '/api/admin/evaluations'
*/
updateEvaluations.url = (options?: RouteQueryOptions) => {
    return updateEvaluations.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaterialController::updateEvaluations
* @see app/Http/Controllers/MaterialController.php:50
* @route '/api/admin/evaluations'
*/
updateEvaluations.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateEvaluations.url(options),
    method: 'post',
})

const MaterialController = { getMaterials, getEvaluations, getQuestions, updateMaterials, updateEvaluations }

export default MaterialController