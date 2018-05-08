# Cachex Distribution

### Existing interface

Examination of what can be implemented in a distributed fashion, off the top of my head:

|    API Function    |                      Determined Functionality                      |
|--------------------|--------------------------------------------------------------------|
| `clear/2`          | Possible but requires calling out to all nodes in the cluster.     |
| `count/2`          | Possible but requires calling out to all nodes in the cluster.     |
| `decr/4`           | Possible via routing the provided key to the appropriate node.     |
| `del/3`            | Possible via routing the provided key to the appropriate node.     |
| `dump/3`           | Not supported due to requirement of syncing disk over clusters.    |
| `empty?/2`         | Possible but requires calling out to all nodes in the cluster.     |
| `execute/3`        | Not supported due to inability to transfer functions across nodes. |
| `exists?/3`        | Possible via routing the provided key to the appropriate node.     |
| `expire/4`         | Possible via routing the provided key to the appropriate node.     |
| `expire_at/4`      | Possible via routing the provided key to the appropriate node.     |
| `fetch/4`          | Not supported due to inability to transfer functions across nodes. |
| `get/3`            | Possible via routing the provided key to the appropriate node.     |
| `get_and_update/4` | Not supported due to inability to transfer functions across nodes. |
| `keys/2`           | Possible but requires calling out to all nodes in the cluster.     |
| `incr/4`           | Possible via routing the provided key to the appropriate node.     |
| `inspect/2`        | Not applicable as this will only ever operate on the local node.   |
| `invoke/4`         | Possible via routing the provided key to the appropriate node.     |
| `load/3`           | Not supported due to the same reasons as `dump/3`.                 |
| `persist/3`        | Possible via routing the provided key to the appropriate node.     |
| `purge/2`          | Possible but requires calling out to all nodes in the cluster.     |
| `put/4`            | Possible via routing the provided key to the appropriate node.     |
| `put_many/3`       | Possible - but only if all keys live on the same node.             |
| `refresh/3`        | Possible via routing the provided key to the appropriate node.     |
| `reset/2`          | Possible but requires calling out to all nodes in the cluster.     |
| `set/4`            | Same reasoning as `put/4`.                                         |
| `set_many/3`       | Same reasoning as `put/3`.                                         |
| `size/2`           | Possible but requires calling out to all nodes in the cluster.     |
| `stats/2`          | Not applicable as this will only ever operate on the local node.   |
| `stream/3`         | Not supported as streaming across nodes makes no sense.            |
| `take/3`           | Possible via routing the provided key to the appropriate node.     |
| `touch/3`          | Possible via routing the provided key to the appropriate node.     |
| `transaction/4`    | Not supported due to inability to transfer functions across nodes. |
| `ttl/3`            | Possible via routing the provided key to the appropriate node.     |
| `update/4`         | Possible via routing the provided key to the appropriate node.     |

In general, a lot of the functionality is supported in a distributed fashion assuming we have a nice way to route appropriately to the nodes in the cluster holding the relevant keys. I'm not particularly thrilled about the amount of functions which need to call out to the entire cluster, since it means we need a good way to co-ordinate that and we can't just ignore it. The inability to transfer functions across nodes can be solved by allowing for a `{ :module, :function }` atom in places we would typically use an anonymous function. This would "enforce" that the function to be called exists on all nodes, regardless of things like scope. This might prove messy in the main API layer, but does not prove impossible. This would mean that only `dump/3`/`load/3` and `stream/3` are _truly_ unsupported, but does not mean that we should support everything just because we can.

### Path to distribution

1. Implement a Cachex router to execute hook-styled invocations.
    - Hash algorithm required for node sharding (without weighting, for now).
    - `call/1` where 1 is of the form `{ :action, args }`.
    - `execute/1` where 1 is of the form `{ :action, args }`.
    - `execute/1` becomes a dispatcher (i.e. migrate out of `cachex.ex`).
2. Main interface becomes nothing more than forwarding, which can be done via the very simple interface of `Cachex.Router.call({ :action, args })`.
    - This will introduce overhead due to the extra function matching.
    - Could introduce macros to the main API to remove this overhead.
    - Main interface must exist for the purpose of documentation and startup.
3. Migrate `{ :action, args }` to a well-defined record type in the spec.
    - Requires co-ordination with Hooks, as they use this specification.
    - Perhaps Hooks adopt the syntax in a v4 or something (breaking change).
4. Ensure optimizations for `nodes: [ node() ]`.
    - Have to skip all node sharding and dispatch.
    - Need a flag to enforce acting as multiple nodes (i.e. consistent state).

### Potential bonuses

1. Add weighting to nodes to allow for "better" nodes to hold more data.
2. Abstract routed pooling library for separate deployments to Hex.pm.
3. Allow for addition/removal of nodes at runtime, as well as rebalancing.
