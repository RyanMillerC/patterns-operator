# UBI is larger than distroless (158Mb vs. 56Mb) but approved by RH
FROM registry.access.redhat.com/ubi8/ubi-minimal
WORKDIR /
COPY ./manager .
USER 65532:65532

ENTRYPOINT ["/manager"]
