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

        This command is used to execute an interactive shell session inside a container of a Kubernetes pod. Here's a breakdown of its components:

        - `kubectl`: The command-line tool for interacting with Kubernetes clusters.
        - `exec`: A subcommand used to execute a command in a container within a pod.
        - `-it`: Two combined flags:
            - `-i` or `--stdin`: Keeps STDIN open, allowing you to send input to the container.
            - `-t` or `--tty`: Allocates a pseudo-TTY, providing an interactive terminal-like experience.
        - `<pod-name>`: The name of the target pod (e.g., debug-job-with-curl-bbpcg).
        - `--`: Separates the kubectl command and its flags from the command to be run inside the container.
        - `/bin/sh`: The command to run inside the container, which starts a shell session.

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