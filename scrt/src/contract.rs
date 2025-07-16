#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult};
// use cw2::set_contract_version;

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};

/*
// version info for migration info
const CONTRACT_NAME: &str = "crates.io:laincoin";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
*/

use crate::msg::{InitMsg, InitialBalance, TokenConfig};
use secret_toolkit::snip20::init as snip20_init;
use cosmwasm_std::{
    DepsMut, Env, MessageInfo, Response, StdResult, Binary, Addr,
};

pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: InitMsg,
) -> StdResult<Response> {
    let entropy: Binary = Binary::from(msg.prng_seed.as_bytes());

    let init_config = msg.config.unwrap_or(TokenConfig {
        public_total_supply: true,
    });

    let initial_balances: Vec<(Addr, u128)> = msg.initial_balances.iter()
        .map(|balance| {
            let address = deps.api.addr_validate(&balance.address)?;
            let amount = balance.amount.parse::<u128>().map_err(|_| {
                cosmwasm_std::StdError::generic_err("Invalid amount")
            })?;
            Ok((address, amount))
        })
        .collect::<StdResult<_>>()?;

    snip20_init(
        deps,
        env,
        info,
        msg.name,
        msg.symbol,
        msg.decimals,
        initial_balances,
        &entropy,
        init_config.public_total_supply,
    )
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    unimplemented!()
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(_deps: Deps, _env: Env, _msg: QueryMsg) -> StdResult<Binary> {
    unimplemented!()
}

#[cfg(test)]
mod tests {}
