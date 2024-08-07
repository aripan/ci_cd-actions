## Explanation

### Deployment:

- Creates a deployment named `webapp-deployment` with one replica.
- Uses the container image `docker-image` which will be replaced by the actual image in the GitHub Actions workflow.
- Exposes port 3000 on the container.
- Uses the secret `ionossecretasad` for pulling the image from a private Docker registry.

### External Service (webapp-service):

- Exposes the deployment externally using a NodePort.
- The service listens on port 3000 and forwards traffic to port 3000 on the pod.
- The node port is set to 30001, making it accessible externally via the node's IP and this port.

### Internal Service (internal-service):

- Exposes the deployment internally within the cluster using a ClusterIP.
- The service listens on port 3000 and forwards traffic to port 3000 on the pod.
- This service is only accessible from within the cluster.

### Accessing the Services

- External Service: Accessible from outside the cluster using the node's IP and node port 30001.

    ``` http://<node-ip>:30001 ```

- Internal Service: Accessible only from within the cluster using the service name internal-service.

    ``` http://internal-service:3000 ```

### Example of external and internal communication
If you have another service or pod within the cluster that needs to communicate with the webapp application, it can use the internal service as follows (can be tested in terminal):

    curl http://internal-service:3000

>But if you try to access internal service from you machine terminal you will get an error as your local machine is outside the cluster.
>To access the internal service, you need to run a pod within the cluster that can make the curl request. Such as

- to create a temporary curlpod in the cluster using the radial/busyboxplus:curl image
    ``` kubectl run curlpod --image=radial/busyboxplus:curl -i --tty --rm --restart=Never ```


        Explanation of flags:
        --image=radial/busyboxplus:curl : Specifies the Docker image to use for the pod.
        -i : Enables interactive mode, allowing you to interact with the pod.
        --tty : Allocates a TTY (teletypewriter) for the pod, which is necessary for interactive mode.
        --rm : Automatically removes the pod after it exits.
        --restart=Never : Ensures that the pod is not restarted if it exits or crashes.


- then you will enter inside the curlpod terminal(cluster) as follows
    ``` [ root@curlpod:/ ]$ ```

- now you can make request to the internal service as follows
    ``` curl http://webapp-internal-service:3000```

- write `exit` to exit from the curlpod terminal
---

>Communicate with external service as follows (can be tested in terminal):

    curl http://85.215.135.68:30001

By defining multiple services in the same YAML file, you can manage both internal and external access to your application efficiently.


### Regarding the secret in workflow needed to pull the image from docker hub

- This Kubernetes secret is needed for the following reasons:

    - Private Registry Access: It allows Kubernetes to authenticate with the private Docker registry (ivicosregistry.cr.de-fra.ionos.com) when pulling images.
    - Image Pull Authentication: When deploying pods, Kubernetes uses this secret to authenticate and pull images from the private registry.
    - Security: It securely stores the credentials (username, password, email) needed for registry access without exposing them in pod specifications.
    - Automation: It enables automated deployments by providing necessary authentication for CI/CD pipelines to pull images during updates or new deployments.
    - In short, this secret is crucial for securely accessing and pulling images from your private Docker registry within the Kubernetes cluster.

But writing the whole code again and again in the workflow is not a good practice so we can use the same secret in the cluster and use it in the workflow (meaning use this as the imagePullSecrets).

The way of creating secret in the cluster is as follows:

    ``` kubectl create secret docker-registry secret-name-here \
    --docker-server=docker-server-name-here \
    --docker-username=docker-username-here \
    --docker-password=docker-password-here \
    --docker-email=docker-email-here ```

    such as
    ``` kubectl create secret docker-registry ionossecretasad \
    --docker-server=ivicosregistry.cr.de-fra.ionos.com \
    --docker-username=${{ secrets.IONOS_TOKEN_NAME }} \
    --docker-password=${{ secrets.IONOS_TOKEN_PASSWORD }} \
    --docker-email=${{ secrets.IONOS_EMAIL }} ```

So simply we can use the same secret in all manifest as imagePullSecrets and we don't need to write the whole code again and again in the workflow.


### resource limits and requests

In Kubernetes, resource management is crucial for efficient cluster operation. The two main resources we manage are CPU and memory. For each container, we can specify:

- Requests: The minimum guaranteed resources
- Limits: The maximum allowed resources

Here's a breakdown with examples:
```
resources:
  requests:
    cpu: 250m
    memory: 256Mi
  limits:
    cpu: 500m
    memory: 512Mi
```
Explanation:
- The container is guaranteed at least 1/4 CPU core and 256Mi of memory.
- It can use up to 1/2 CPU core and 512Mi of memory if available.

<u><strong>More examples:</strong></u>
```
# Example 1: Minimal resources
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 200m
    memory: 256Mi

# Example 2: Resource-intensive application
resources:
  requests:
    cpu: 1
    memory: 1Gi
  limits:
    cpu: 2
    memory: 2Gi

# Example 3: Memory-intensive, low CPU
resources:
  requests:
    cpu: 100m
    memory: 2Gi
  limits:
    cpu: 500m
    memory: 4Gi

# Example 4: CPU-intensive, low memory
resources:
  requests:
    cpu: 2
    memory: 512Mi
  limits:
    cpu: 4
    memory: 1Gi
```

Key points:
- CPU is measured in cores or millicores (m). 1000m = 1 core.
- Memory is typically in Mi (Mebibytes) or Gi (Gibibytes).
- Requests should be set to what your application needs to run smoothly.
- Limits prevent a container from using excessive resources.
- It's common to set limits higher than requests to allow for spikes.

The scheduler uses requests to decide which node to place the pod on. Limits are enforced by the kubelet on each node.
By properly setting these values, you ensure your applications have the resources they need while maintaining overall cluster efficiency and preventing resource contention.