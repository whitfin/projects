# DZ Concept

In the past, I wrote a small tool for using Docker for one-off instances. This is hosted over on npm under the name [dockserv](https://www.npmjs.com/package/dockserv). Not only does this implementation leave a lot to be desired, it's also very incomplete and far from what I wanted at the time (due to both lack of time and lack of familiarity). However, I'm feeling a need for a similar tool more and more; therefore the following are a few ideas about what could come next.

The point is basically to enable easy sharing of Docker setup, without having to go all out on something like `docker-compose.yml` or alternate configurations of the same ilk. The intent is very much to simply drop container definitions (such as the default commands you find on Docker Hub) into a repository (or whatever), and team members can simply set that up to be managed pretty easily (i.e. `dz add mongo mongo-definition.json`). Voila, your team is all using the same container setup and thus there should be no surprises :).

### Interface

```shell
# simple services
$ dz add <service>
$ dz add <service> <json>
$ dz add <service> <json-url>
$ dz clone <service> <name>
$ dz edit <service>
$ dz list
$ dz remove <service>
$ dz rename <service>
$ dz reset <service>
$ dz restart <service>
$ dz start <service>
$ dz stop <service>
$ dz view <service>

# service groups, easy swarming
$ dz group add <group> <services...>
$ dz group clone <group> <name>
$ dz group create <group>
$ dz group list
$ dz group start <group>
$ dz group stop <group>
$ dz group remove <group>
$ dz group rename <group>
$ dz group reset <group>
$ dz group restart <group>
$ dz group view <group>
```
