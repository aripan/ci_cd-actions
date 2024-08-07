# Debugging without YAML
- run the following command to create a new debug pod
    ```bash
    kubectl run debug-$(date +%s) -it --rm --image=curlimages/curl -- sh
    ```
- you will be redirected to the pod shell
- you can now run any command you want
    such as
    - curl the identity provider service (if the debug pod is in the same namespace as the identity provider service)
    ```bash
    curl http://v1-identity-provider-service:3000
    ```
    - curl the identity provider service (if the debug pod is in the different namespace as the identity provider service)
    ```bash
    curl http://v1-identity-provider-service.default.svc.cluster.local:3000
    ```
- exit the debug session
    ```bash
    exit
    ```
- the pod will be deleted automatically after the debug session is over