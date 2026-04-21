# Bootstrapping a new server

## VPS setup

- Provision the VPS and ensure that your computer's SSH public key and the GitHub CI SSH public key are added.

## Prerequisites

For the specific stage you want to configure, add the server IP to:

- Ansible: `ansible/<stage>/hosts`
- Kamal: `config/deploy.<stage>.yml`

## Ansible

Use playbooks `0` through `2` to provision the deploy user, bootstrap the server, and harden SSH and firewall settings.

For production:

```bash
ansible-playbook -i ansible/production/hosts ansible/playbooks/0_playbook_deploy_user_provision.yml
ansible-playbook -i ansible/production/hosts ansible/playbooks/1_playbook_bootstrap_server.yml
ansible-playbook -i ansible/production/hosts ansible/playbooks/2_playbook_harden_server.yml
```

## Kamal

After the server basics are in place, run Kamal commands to install Docker support, Kamal Proxy, accessories, and the app itself.

Ensure you have `.kamal/secrets.<stage>` set up properly.

You can also use playbook `3` to automate the Kamal bootstrap and accessory boot commands.

1. `kamal server bootstrap -d <STAGE>`: to install docker, etc.
2. `kamal proxy boot -d <STAGE>`: to install kamal-proxy
3. `kamal accessory boot <ACCESSORY> -d <STAGE>`: to install `postgres`, `redis`, and `anycable_go`
4. Ensure all environment values are set in GitHub Environment vars and secrets
5. Run the GitHub Actions production deploy workflow or `kamal deploy -d <STAGE>`
