import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProgressController::leaderboard
* @see app/Http/Controllers/ProgressController.php:121
* @route '/api/progress/leaderboard/all'
*/
export const leaderboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaderboard.url(options),
    method: 'get',
})

leaderboard.definition = {
    methods: ["get","head"],
    url: '/api/progress/leaderboard/all',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProgressController::leaderboard
* @see app/Http/Controllers/ProgressController.php:121
* @route '/api/progress/leaderboard/all'
*/
leaderboard.url = (options?: RouteQueryOptions) => {
    return leaderboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProgressController::leaderboard
* @see app/Http/Controllers/ProgressController.php:121
* @route '/api/progress/leaderboard/all'
*/
leaderboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaderboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProgressController::leaderboard
* @see app/Http/Controllers/ProgressController.php:121
* @route '/api/progress/leaderboard/all'
*/
leaderboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: leaderboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProgressController::show
* @see app/Http/Controllers/ProgressController.php:13
* @route '/api/progress/{userId}'
*/
export const show = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/progress/{userId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProgressController::show
* @see app/Http/Controllers/ProgressController.php:13
* @route '/api/progress/{userId}'
*/
show.url = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userId: args }
    }

    if (Array.isArray(args)) {
        args = {
            userId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        userId: args.userId,
    }

    return show.definition.url
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProgressController::show
* @see app/Http/Controllers/ProgressController.php:13
* @route '/api/progress/{userId}'
*/
show.get = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProgressController::show
* @see app/Http/Controllers/ProgressController.php:13
* @route '/api/progress/{userId}'
*/
show.head = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProgressController::addXp
* @see app/Http/Controllers/ProgressController.php:46
* @route '/api/progress/{userId}/xp'
*/
export const addXp = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addXp.url(args, options),
    method: 'post',
})

addXp.definition = {
    methods: ["post"],
    url: '/api/progress/{userId}/xp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProgressController::addXp
* @see app/Http/Controllers/ProgressController.php:46
* @route '/api/progress/{userId}/xp'
*/
addXp.url = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userId: args }
    }

    if (Array.isArray(args)) {
        args = {
            userId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        userId: args.userId,
    }

    return addXp.definition.url
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProgressController::addXp
* @see app/Http/Controllers/ProgressController.php:46
* @route '/api/progress/{userId}/xp'
*/
addXp.post = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addXp.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProgressController::recordGameResult
* @see app/Http/Controllers/ProgressController.php:66
* @route '/api/progress/{userId}/game-result'
*/
export const recordGameResult = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordGameResult.url(args, options),
    method: 'post',
})

recordGameResult.definition = {
    methods: ["post"],
    url: '/api/progress/{userId}/game-result',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProgressController::recordGameResult
* @see app/Http/Controllers/ProgressController.php:66
* @route '/api/progress/{userId}/game-result'
*/
recordGameResult.url = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userId: args }
    }

    if (Array.isArray(args)) {
        args = {
            userId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        userId: args.userId,
    }

    return recordGameResult.definition.url
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProgressController::recordGameResult
* @see app/Http/Controllers/ProgressController.php:66
* @route '/api/progress/{userId}/game-result'
*/
recordGameResult.post = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordGameResult.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProgressController::completeChapter
* @see app/Http/Controllers/ProgressController.php:100
* @route '/api/progress/{userId}/complete-chapter'
*/
export const completeChapter = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeChapter.url(args, options),
    method: 'post',
})

completeChapter.definition = {
    methods: ["post"],
    url: '/api/progress/{userId}/complete-chapter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProgressController::completeChapter
* @see app/Http/Controllers/ProgressController.php:100
* @route '/api/progress/{userId}/complete-chapter'
*/
completeChapter.url = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userId: args }
    }

    if (Array.isArray(args)) {
        args = {
            userId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        userId: args.userId,
    }

    return completeChapter.definition.url
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProgressController::completeChapter
* @see app/Http/Controllers/ProgressController.php:100
* @route '/api/progress/{userId}/complete-chapter'
*/
completeChapter.post = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeChapter.url(args, options),
    method: 'post',
})

const ProgressController = { leaderboard, show, addXp, recordGameResult, completeChapter }

export default ProgressController