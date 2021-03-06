// tslint:disable
/**
 * Midgard Public API
 * The Midgard Public API queries THORChain and any chains linked via the Bifröst and prepares information about the network to be readily available for public users. The API parses transaction event data from THORChain and stores them in a time-series database to make time-dependent queries easy. Midgard does not hold critical information. To interact with BEPSwap and Asgardex, users should query THORChain directly.
 *
 * The version of the OpenAPI document: 0.8.0
 * Contact: devs@thorchain.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Observable } from 'rxjs';
import { BaseAPI, HttpQuery, throwIfNullOrUndefined, encodeURI } from '../runtime';
import {
    AssetDetail,
    InlineResponse200,
    InlineResponse2001,
    NetworkInfo,
    NodeKey,
    PoolAggChanges,
    PoolDetail,
    PoolEarningDetail,
    StakersAddressData,
    StakersAssetData,
    StatsChanges,
    StatsData,
    ThorchainConstants,
    ThorchainEndpoints,
    ThorchainLastblock,
    ThorchainQueue,
    TotalVolChanges,
} from '../models';

export interface GetAssetInfoRequest {
    asset: string;
}

export interface GetEarningDetailRequest {
    pool: string;
}

export interface GetPoolAggChangesRequest {
    pool: string;
    interval: GetPoolAggChangesIntervalEnum;
    from: number;
    to: number;
}

export interface GetPoolsRequest {
    status?: GetPoolsStatusEnum;
}

export interface GetPoolsDetailsRequest {
    asset: string;
    view?: GetPoolsDetailsViewEnum;
}

export interface GetStakersAddressAndAssetDataRequest {
    address: string;
    asset: string;
}

export interface GetStakersAddressDataRequest {
    address: string;
}

export interface GetStatsChangesRequest {
    interval: GetStatsChangesIntervalEnum;
    from: number;
    to: number;
}

export interface GetTotalVolChangesRequest {
    interval: GetTotalVolChangesIntervalEnum;
    from: number;
    to: number;
}

export interface GetTxDetailsRequest {
    offset: number;
    limit: number;
    address?: string;
    txid?: string;
    asset?: string;
    type?: string;
}

/**
 * no description
 */
export class DefaultApi extends BaseAPI {

    /**
     * Detailed information about a specific asset. Returns enough information to display a unique asset in various user interfaces, including latest price.
     * Get Asset Information
     */
    getAssetInfo = ({ asset }: GetAssetInfoRequest): Observable<Array<AssetDetail>> => {
        throwIfNullOrUndefined(asset, 'getAssetInfo');

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'asset': asset,
        };

        return this.request<Array<AssetDetail>>({
            path: '/v1/assets',
            method: 'GET',
            query,
        });
    };

    /**
     * Returns earning report and apy of the specified pool.
     * Get Pool Earning Detail
     */
    getEarningDetail = ({ pool }: GetEarningDetailRequest): Observable<PoolEarningDetail> => {
        throwIfNullOrUndefined(pool, 'getEarningDetail');

        return this.request<PoolEarningDetail>({
            path: '/v1/pools/details/{pool}/earnings'.replace('{pool}', encodeURI(pool)),
            method: 'GET',
        });
    };

    /**
     * Returns an object containing the health response of the API.
     * Get Health
     */
    getHealth = (): Observable<InlineResponse200> => {
        return this.request<InlineResponse200>({
            path: '/v1/health',
            method: 'GET',
        });
    };

    /**
     * Returns an object containing Network data
     * Get Network Data
     */
    getNetworkData = (): Observable<NetworkInfo> => {
        return this.request<NetworkInfo>({
            path: '/v1/network',
            method: 'GET',
        });
    };

    /**
     * Returns an object containing Node public keys
     * Get Node public keys
     */
    getNodes = (): Observable<Array<NodeKey>> => {
        return this.request<Array<NodeKey>>({
            path: '/v1/nodes',
            method: 'GET',
        });
    };

    /**
     * Returns historical aggregated details of the specified pool.
     * Get Pool Aggregated Changes
     */
    getPoolAggChanges = ({ pool, interval, from, to }: GetPoolAggChangesRequest): Observable<Array<PoolAggChanges>> => {
        throwIfNullOrUndefined(pool, 'getPoolAggChanges');
        throwIfNullOrUndefined(interval, 'getPoolAggChanges');
        throwIfNullOrUndefined(from, 'getPoolAggChanges');
        throwIfNullOrUndefined(to, 'getPoolAggChanges');

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'pool': pool,
            'interval': interval,
            'from': from,
            'to': to,
        };

        return this.request<Array<PoolAggChanges>>({
            path: '/v1/history/pools',
            method: 'GET',
            query,
        });
    };

    /**
     * Returns an array containing all the assets supported on BEPSwap pools
     * Get Asset Pools
     */
    getPools = ({ status }: GetPoolsRequest): Observable<Array<string>> => {

        const query: HttpQuery = {};

        if (status != null) { query['status'] = status; }

        return this.request<Array<string>>({
            path: '/v1/pools',
            method: 'GET',
            query,
        });
    };

    /**
     * Returns an object containing all the pool details for that asset.
     * Get Pools Details
     */
    getPoolsDetails = ({ asset, view }: GetPoolsDetailsRequest): Observable<Array<PoolDetail>> => {
        throwIfNullOrUndefined(asset, 'getPoolsDetails');

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'asset': asset,
        };

        if (view != null) { query['view'] = view; }

        return this.request<Array<PoolDetail>>({
            path: '/v1/pools/detail',
            method: 'GET',
            query,
        });
    };

    /**
     * Returns an object containing staking data for the specified staker and pool.
     * Get Staker Pool Data
     */
    getStakersAddressAndAssetData = ({ address, asset }: GetStakersAddressAndAssetDataRequest): Observable<Array<StakersAssetData>> => {
        throwIfNullOrUndefined(address, 'getStakersAddressAndAssetData');
        throwIfNullOrUndefined(asset, 'getStakersAddressAndAssetData');

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'asset': asset,
        };

        return this.request<Array<StakersAssetData>>({
            path: '/v1/stakers/{address}/pools'.replace('{address}', encodeURI(address)),
            method: 'GET',
            query,
        });
    };

    /**
     * Returns an array containing all the pools the staker is staking in.
     * Get Staker Data
     */
    getStakersAddressData = ({ address }: GetStakersAddressDataRequest): Observable<StakersAddressData> => {
        throwIfNullOrUndefined(address, 'getStakersAddressData');

        return this.request<StakersAddressData>({
            path: '/v1/stakers/{address}'.replace('{address}', encodeURI(address)),
            method: 'GET',
        });
    };

    /**
     * Returns an array containing the addresses for all stakers.
     * Get Stakers
     */
    getStakersData = (): Observable<Array<string>> => {
        return this.request<Array<string>>({
            path: '/v1/stakers',
            method: 'GET',
        });
    };

    /**
     * Returns an object containing global stats for all pools and all transactions.
     * Get Global Stats
     */
    getStats = (): Observable<StatsData> => {
        return this.request<StatsData>({
            path: '/v1/stats',
            method: 'GET',
        });
    };

    /**
     * Returns stats and total changes of all pools in specified interval
     * Get Stats Changes
     */
    getStatsChanges = ({ interval, from, to }: GetStatsChangesRequest): Observable<Array<StatsChanges>> => {
        throwIfNullOrUndefined(interval, 'getStatsChanges');
        throwIfNullOrUndefined(from, 'getStatsChanges');
        throwIfNullOrUndefined(to, 'getStatsChanges');

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'interval': interval,
            'from': from,
            'to': to,
        };

        return this.request<Array<StatsChanges>>({
            path: '/v1/history/stats',
            method: 'GET',
            query,
        });
    };

    /**
     * Returns a proxied endpoint for the constants endpoint from a local thornode
     * Get the Proxied THORChain Constants
     */
    getThorchainProxiedConstants = (): Observable<ThorchainConstants> => {
        return this.request<ThorchainConstants>({
            path: '/v1/thorchain/constants',
            method: 'GET',
        });
    };

    /**
     * Returns a proxied endpoint for the pool_addresses endpoint from a local thornode
     * Get the Proxied Pool Addresses
     */
    getThorchainProxiedEndpoints = (): Observable<ThorchainEndpoints> => {
        return this.request<ThorchainEndpoints>({
            path: '/v1/thorchain/pool_addresses',
            method: 'GET',
        });
    };

    /**
     * Returns a proxied endpoint for the lastblock endpoint from a local thornode
     * Get the Proxied THORChain Lastblock
     */
    getThorchainProxiedLastblock = (): Observable<ThorchainLastblock> => {
        return this.request<ThorchainLastblock>({
            path: '/v1/thorchain/lastblock',
            method: 'GET',
        });
    };

    /**
     * Returns a proxied endpoint for the queue endpoint from a local thornode
     * Get the Proxied THORChain Queue
     */
    getThorchainProxiedQueue = (): Observable<ThorchainQueue> => {
        return this.request<ThorchainQueue>({
            path: '/v1/thorchain/queue',
            method: 'GET',
        });
    };

    /**
     * Returns total volume changes of all pools in specified interval
     * Get Total Volume Changes
     */
    getTotalVolChanges = ({ interval, from, to }: GetTotalVolChangesRequest): Observable<Array<TotalVolChanges>> => {
        throwIfNullOrUndefined(interval, 'getTotalVolChanges');
        throwIfNullOrUndefined(from, 'getTotalVolChanges');
        throwIfNullOrUndefined(to, 'getTotalVolChanges');

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'interval': interval,
            'from': from,
            'to': to,
        };

        return this.request<Array<TotalVolChanges>>({
            path: '/v1/history/total_volume',
            method: 'GET',
            query,
        });
    };

    /**
     * Return an array containing the event details
     * Get details of a tx by address, asset or tx-id
     */
    getTxDetails = ({ offset, limit, address, txid, asset, type }: GetTxDetailsRequest): Observable<InlineResponse2001> => {
        throwIfNullOrUndefined(offset, 'getTxDetails');
        throwIfNullOrUndefined(limit, 'getTxDetails');

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'offset': offset,
            'limit': limit,
        };

        if (address != null) { query['address'] = address; }
        if (txid != null) { query['txid'] = txid; }
        if (asset != null) { query['asset'] = asset; }
        if (type != null) { query['type'] = type; }

        return this.request<InlineResponse2001>({
            path: '/v1/txs',
            method: 'GET',
            query,
        });
    };

}

/**
 * @export
 * @enum {string}
 */
export enum GetPoolAggChangesIntervalEnum {
    _5min = '5min',
    Hour = 'hour',
    Day = 'day',
    Week = 'week',
    Month = 'month',
    Year = 'year'
}
/**
 * @export
 * @enum {string}
 */
export enum GetPoolsStatusEnum {
    Enabled = 'enabled',
    Bootstrap = 'bootstrap',
    Suspended = 'suspended'
}
/**
 * @export
 * @enum {string}
 */
export enum GetPoolsDetailsViewEnum {
    Balances = 'balances',
    Simple = 'simple',
    Full = 'full'
}
/**
 * @export
 * @enum {string}
 */
export enum GetStatsChangesIntervalEnum {
    _5min = '5min',
    Hour = 'hour',
    Day = 'day',
    Week = 'week',
    Month = 'month',
    Year = 'year'
}
/**
 * @export
 * @enum {string}
 */
export enum GetTotalVolChangesIntervalEnum {
    _5min = '5min',
    Hour = 'hour',
    Day = 'day',
    Week = 'week',
    Month = 'month',
    Year = 'year'
}
