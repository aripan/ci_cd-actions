# Debug Jobs
### Debugging with Curl
- create a yaml file for the job (i.e. debug-with-curl.yaml, debug-with-busybox.yaml)
- apply the yaml file/job
    ```bash
    kubectl apply -f debug-with-curl.yaml (provide the path to the yaml file)
    ```
- get the pod name
    ```bash
    kubectl get pods
    ```
- get the job name
    ```bash
    kubectl get jobs
    ```
- exec into the pod
    ```bash
    kubectl exec -it <pod-name> -- /bin/sh (provide the pod name)
    ```
    example:
    ```bash
    kubectl exec -it debug-job-with-curl-bbpcg -- /bin/sh
    ```
- run the curl command
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
- delete the job
    ```bash
    kubectl delete job debug-job-with-curl
    ```